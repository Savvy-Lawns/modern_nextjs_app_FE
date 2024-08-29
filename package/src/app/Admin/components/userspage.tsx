"use client";
import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import UserAccordion from './userAccordion';

import withAuth from '@/utils/withAuth';

const UsersPage = () => {
  const [token, setToken] = useState<string | undefined>('');

  useEffect(() => {
    // This useEffect is only responsible for setting the token
    const fetchedToken = Cookie.get('token');
    setToken(fetchedToken);
  }, []); // Empty dependency array means this runs once on component mount
  
  useEffect(() => {
    // This useEffect is responsible for checking the token's existence
    if (!token) {
      console.error('Token not found. User must be authenticated.');
      // Here you might want to redirect the user to a login page or show an error message
    }
  }, [token]); 

  return (
    
      
        <div>
            
            <div >
            <UserAccordion index={''} token={token} />
            
            
            
          
         
         
         
            </div>
            </div>
    
  );
};

export default withAuth(UsersPage);

