"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { Service } from '../components/servicesAccordion'; // Ensure this path is correct


const useFetchServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/services', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { data } = await response.json();
        const services: Service[] = data.map(({ id, attributes }: { id: string, attributes: any }) => ({
          id: parseInt(id, 10),
          name: attributes.name,
          measurement_unit: attributes.measurement_unit,
          price: attributes.price,
          notes: attributes.notes,
          service_type: attributes.service_type,
        }));
        setServices(services);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // Add dependencies if needed

  return { services, loading, error };
};

export default useFetchServices;