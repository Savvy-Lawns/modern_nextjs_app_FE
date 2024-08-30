"use-client"
// useFetchUsers.ts
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL =  process.env.API_URL

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const token = Cookie.get('token');
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiURL}users`, {
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
        const users = data.map(({ id, attributes }: { id: string, attributes: any }) => ({
          id: id.toString(),
          username: attributes.username,
          email: attributes.email,
          phone: attributes.phone_number,
          acctType: attributes.role,
        }));
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Add dependencies if needed

  return { users, loading, error };
};

export default useFetchUsers;