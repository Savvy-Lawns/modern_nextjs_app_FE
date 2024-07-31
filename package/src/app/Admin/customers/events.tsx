import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const useFetchEvents = (customerId: number | string) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        setError('User must be authenticated.');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/customers/${customerId}/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData); // Log the entire response to understand its structure

        if (!responseData.data) {
          throw new Error('Data is undefined');
        }

        const events = responseData.data.map((event: any) => {
          const eventServices = event.attributes.event_services;
          if (!eventServices) {
            console.error('Event services are missing:', event);
            return null;
          }

          return {
            customer_id: event.id,
            event_services_attributes: eventServices.map((service: any) => ({
              service_id: service.service_id,
              recurrence_type: service.recurrence_type,
              start_date: service.start_date,
              end_date: service.end_date,
              status: service.status,
              property_metric: service.property_metric,
              duration: service.duration,
              paid: service.paid,
              notes: service.notes,
              recurrence_series_id: service.recurrence_series_id
            }))
          };
        }).filter((event: any) => event !== null); // Filter out any null events

        setEvents(events);
      } catch (err) {
        const error = err as Error;
        console.error('Failed to fetch events:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [customerId]);

  return { events, loading, error };
};

export default useFetchEvents;