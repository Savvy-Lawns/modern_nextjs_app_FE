"use client";

import React from 'react';
import CustomerAccordion from './customerAccordion';
import AddForm from './add';
import withAuth from '@/utils/withAuth';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';


const CustomerPage = () => {
const [token, setToken] = useState<string | undefined>('');


  useEffect(() => {
    
      setToken(Cookie.get('token'));
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        return;
      }
    });

const date = new Date().toLocaleString();


  return (
    
      
        <div>
            
            
            <CustomerAccordion token={token} />
           <AddForm
        title="Add Customer"
        buttonType={1} // Assuming 1 is the correct type for showing the button
        entityType="customers"
        token={token}
        
        name=""
        phone_number=""
        email=""
        address=""
        notes={'Created at ' + date}
      />
            
            
            
          
         
         
         
        
            </div>
    
  );
};

export default withAuth(CustomerPage);