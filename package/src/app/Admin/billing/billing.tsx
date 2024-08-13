"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const useFetchUnpaidServices = (start_date: string, end_date: string) => {
    const [unpaidServices, setUnpaidServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUnpaidServices = async () => {
      if (!start_date || !end_date) {
        console.error('Start date and end date must be provided.');
        setLoading(false);
        return;
      }
  
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/reports/customers_with_active_events?start_date=${start_date}&end_date=${end_date}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const  data  = await response.json();
        console.log('data (fetchPage):', data);
        
        setUnpaidServices(data);
        
      } catch (error: any) {
        console.error('Failed to fetch unpaid services:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUnpaidServices();
  }, [start_date, end_date]);
  console.log('unpaidServices (fetchPage):', unpaidServices);
  return { unpaidServices, loading, error };
};

export default useFetchUnpaidServices;