import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import useFetchEvents from './events';

const useFetchEventServices = (customerId: number | string, eventId: number | string) => {
  const [eventServices, setEventServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { events} = useFetchEvents(customerId);

  

  useEffect(() => {
    const fetchEventServices = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        setError('User must be authenticated.');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/customer/${customerId}/events/${eventId}`, {
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

        setEventServices(responseData);
      } catch (err) {
        const error = err as Error;
        console.error('Failed to fetch event services:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventServices();
  }, []);

  return { eventServices, loading, error };
};

export default useFetchEventServices;