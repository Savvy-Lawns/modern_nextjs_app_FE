"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';



const useFetchFinanceReport = () => {
    const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const apiURL =  process.env.NEXT_PUBLIC_API_URL
// const apiURL =  'http://127.0.0.1:3000/api/v1'

  useEffect(() => {
    const fetchFinanceReports = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        alert('Token not found. User must be authenticated.');
        setLoading(false);
        window.location.href = '/authentication/login';
        return;
      }

      try {
        const response = await axios.get(`${apiURL}/summaries`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200 || response.status === 201) {
            
            setReports(response.data);
            
            
        
            
            
        } else {
            alert(`Failed to save the report. Status code: ${response.status}`)
            throw new Error(`Failed to save the report. Status code: ${response.status}`);
        }
       
        setReports(response.data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
        alert(`Failed to fetch reports: ${error}`);
        
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceReports();
  }, []); // Add dependencies if needed

 
  return { reports, loading, error  };
};

export default useFetchFinanceReport;