"use-client"
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';


interface Note  {
    id: number | string;
    created_at: string;
    note: string;

}[]
type Props = {
    notes: Note[];
    loading: boolean;
    error: any;
    customer_id: number | string;
    token: string | undefined;
};



const useFetchNotes = (customer_id:number  | string, token: string | undefined): Props => {
    const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const apiURL =  process.env.NEXT_PUBLIC_API_URL
// const apiURL =  'http://127.0.0.1:3000/api/v1'

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiURL}/customers/${customer_id}/customer_notes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
          alert('Network response was not ok')
          throw new Error('Network response was not ok');
          
        }

        const { data } = await response.json();
        const notes: Note[] = data.map(({ id, attributes }: { id: string, attributes: any }) => ({
          id: parseInt(id, 10),
          created_at: attributes.created_at,
          note: attributes.note, 
          
        }));
        setNotes(notes);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        alert(`Failed to fetch Notes: ${error}`);
        
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []); // Add dependencies if needed

 
  return { notes, loading, error, customer_id, token };
};

export default useFetchNotes;