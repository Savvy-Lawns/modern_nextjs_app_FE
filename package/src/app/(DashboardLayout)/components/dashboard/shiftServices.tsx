"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { indexOf } from 'lodash';

const useFetchShiftServices = () => {
  const [shiftServices, setShiftServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const apiURL =  process.env.API_URL

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
        const now = new Date();
        const storedOptimizedShiftServices = localStorage.getItem('optimizedShiftServices');
        const expirationTime = localStorage.getItem('optimizedShiftServicesExpiration');
        console.log('storedOptimizedShiftServices:', storedOptimizedShiftServices);
        console.log('expirationTime:', expirationTime);
        
        if (storedOptimizedShiftServices && expirationTime && new Date(expirationTime) > now) {
          setShiftServices(JSON.parse(storedOptimizedShiftServices));
        } else {
          const response = await fetch(`${apiURL}reports/event_services_for_today`, {
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

          // Set expiration time to midnight
          const midnight = new Date();
          midnight.setHours(24, 0, 0, 0);
          localStorage.setItem('optimizedShiftServices', JSON.stringify(data));
          localStorage.setItem('optimizedShiftServicesExpiration', midnight.toISOString());
        }
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

interface Customer {
  customer_address: string;
  key: string;  
  };
  // other service fields


  const reorderShiftServices = (shiftServices: any, optimizedAddresses: any, setOptimized: (value: boolean) => void) => {
    console.log('Input shiftServices:', shiftServices);
    console.log('Input optimizedAddresses:', optimizedAddresses);
  
    const filteredShiftServices = shiftServices.filter((customer: any) => customer !== undefined && customer.customer_address !== undefined);
    console.log('Filtered shiftServices:', filteredShiftServices);
  
    // Create a map to find the index of each address in optimizedAddresses
    const addressIndexMap = new Map<string, number>();
    optimizedAddresses.forEach((address:any, index:any) => {
      addressIndexMap.set(address, index);
    });
    console.log('addressIndexMap:', addressIndexMap);
  
    // Sort the shiftServices based on the index of their addresses in optimizedAddresses
    const reorderedShiftServices = filteredShiftServices.sort((a:any, b:any) => {
      const indexA = addressIndexMap.get(a.customer_address) ?? -1;
      const indexB = addressIndexMap.get(b.customer_address) ?? -1;
      return indexA - indexB;
    });
    console.log('Reordered shiftServices:', reorderedShiftServices);
  
    // Check if the reordered list is the same as the current list
    const isSameList = JSON.stringify(reorderedShiftServices) === JSON.stringify(shiftServices);
  
    if (!isSameList) {
      // Add any new services to the bottom of the list
      const newServices = shiftServices.filter((service: any) => !addressIndexMap.has(service.customer_address));
      const finalShiftServices = [...reorderedShiftServices, ...newServices];
      console.log('Final shiftServices with new services added:', finalShiftServices);
  
      // Set optimized to false if there are new services
      if (newServices.length > 0) {
        setOptimized(false);
      }
  
      // Store the final shift services in local storage
      localStorage.setItem('optimizedShiftServices', JSON.stringify(finalShiftServices));
  
      return finalShiftServices;
    }
  
    return reorderedShiftServices;
  };

export default useFetchShiftServices;
export { reorderShiftServices };


//function to reorder the optimized shift services based on service.event_services[i].status === 'completed', if the status is completed, move the customer to