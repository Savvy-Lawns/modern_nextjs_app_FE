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
import ServicesAccordion from './servicesAccordion';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Margin, Padding } from '@mui/icons-material';

const ServicessPage = () => {
  return (
    
      
        <div>
            
            <div >
            <ServicesAccordion  />
            
            
            
          
         
         
         
            </div>
            </div>
    
  );
};

export default ServicessPage;

