"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const useFetchShiftServices = () => {
  const [shiftServices, setShiftServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchShiftServices = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/reports/event_services_for_today`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('data (fetchPage):', data);
        setShiftServices(data);
      } catch (error: any) {
        console.error('Failed to fetch shift services:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShiftServices();
  }, []);

  return { shiftServices, loading, error };
};

export default useFetchShiftServices;