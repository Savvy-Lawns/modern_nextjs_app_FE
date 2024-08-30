"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import Customer from '../components/customerAccordion'; 


const useFetchCustomers = () => {
  const [customers, setCustomers] = useState<typeof Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL =  process.env.API_URL

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('${apiURL}customers', {
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
        const customers: typeof Customer[] = data.map(({ id, attributes }: { id: string, attributes: any }) => ({
          id: parseInt(id, 10),
          name: attributes.name,
          address: attributes.address, // Corrected from attributes.measurement_unit to attributes.address
          phone_number: attributes.phone_number, // Corrected from attributes.price to attributes.phone_number
          notes: attributes.notes,
          email: attributes.email,
          bill_date: attributes.bill_date // Corrected from attributes.customer_type to attributes.email
        }));
        setCustomers(customers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []); // Add dependencies if needed

 
  return { customers, loading, error,  };
};

export default useFetchCustomers;