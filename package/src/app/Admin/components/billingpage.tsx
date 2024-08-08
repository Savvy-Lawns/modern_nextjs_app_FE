"use client";

import React from 'react';
import BillingAccordion from './billingAccordion';
import AddForm from './add';
import withAuth from '@/utils/withAuth';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';


const BillingPage = () => {
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
            
            
            <BillingAccordion token={token} index={undefined} />
           
            
            
            
          
         
         
         
        
            </div>
    
  );
};

export default withAuth(BillingPage);