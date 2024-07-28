"use client";

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Margin, Padding } from '@mui/icons-material';
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