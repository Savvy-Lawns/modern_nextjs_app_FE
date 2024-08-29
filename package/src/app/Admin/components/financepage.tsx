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
import ExpensesAccordion from './expenseAccordion';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Margin, Padding } from '@mui/icons-material';
import AddForm from './add';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import withAuth from '@/utils/withAuth';
import FinanceAccordion from './financeAccordion'; 

const FinancePage = () => {
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
            <FinanceAccordion   />
            
            
            
          
         
         
         
            </div>
            </div>
    
  );
};

export default FinancePage;

