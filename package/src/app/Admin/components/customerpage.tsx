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



  return (
    
      
        <div>
            
            
            <CustomerAccordion />
           <AddForm
        title="Add Customer"
        buttonType={1} // Assuming 1 is the correct type for showing the button
        entityType="customer"
        token={token}
        name=""
        phone=""
        email=""
        address=""
      />
            
            
            
          
         
         
         
        
            </div>
    
  );
};

export default withAuth(CustomerPage);