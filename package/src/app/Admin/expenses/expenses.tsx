"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import Expense from '../components/expenseAccordion'; // Ensure this path is correct


const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState<typeof Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // const apiURL =  process.env.NEXT_PUBLIC_API_URL
const apiURL =  'http://127.0.0.1:3000/api/v1'

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiURL}/expenses`, {
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
        const expenses: typeof Expense[] = data.map(({ id, attributes }: { id: string, attributes: any }) => ({
          id: parseInt(id, 10),
          name: attributes.name,
          cost: attributes.cost, 
          user_id: attributes.user_id, 
          notes: attributes.notes,
          created_at: attributes.created_at,
          
        }));
        setExpenses(expenses);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []); // Add dependencies if needed

  return { expenses, loading, error };
};

export default useFetchExpenses;