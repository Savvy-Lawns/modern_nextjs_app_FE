import { useState, useEffect, useCallback } from 'react';
import Cookie from 'js-cookie';

const useFetchEvents = (customerId: number | string) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    // const apiURL =  process.env.NEXT_PUBLIC_API_URL
const apiURL =  'http://127.0.0.1:3000/api/v1'

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const token = Cookie.get('token');
    if (!token) {
      console.error('Token not found. User must be authenticated.');
      setLoading(false);
      setError('User must be authenticated.');
      return;
    }

    try {
      const response = await fetch(`${apiURL}/customers/${customerId}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.exception || 'Network response was not ok');
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
          event_id: event.id, // Include event_id here
          customer_id: event.relationships.customer.data.id,
          status: event.attributes.status,
          event_services_attributes: eventServices.map((service: any) => ({
            id: service.id,
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
          })),
          amount_paid: event.attributes.amount_paid,
          balance: event.attributes.balance,
          created_at: event.attributes.created_at,
          estimated_service_cost: event.attributes.estimated_service_cost,
          updated_at: event.attributes.updated_at,
          relationships: event.relationships,
          event_notes: event.event_notes,
          transactions: event.transactions,
          user_events: event.user_events
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
  }, [customerId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error };
};

export default useFetchEvents;