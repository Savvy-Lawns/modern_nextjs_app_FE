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
import UserAccordion from './userAccordion';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Margin, Padding } from '@mui/icons-material';

const UsersPage = () => {
  return (
    
      
        <div>
            
            <div >
            <UserAccordion index={''} />
            
            
            
          
         
         
         
            </div>
            </div>
    
  );
};

export default UsersPage;

