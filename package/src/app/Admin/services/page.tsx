import React from 'react';
import Link from "next/link";

import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { ArrowBack, Refresh } from '@mui/icons-material';
import ServicessPage from '../components/servicespage';

const Services = () => {
    return (
        <DashboardCard title={<div style={{display:'flex', justifyContent:'center'}}><a href="/Admin"><ArrowBack style={{paddingTop: '5px', position: "absolute", left: 35,}} /></a> Services<a href='/Admin/services'><Refresh style={{paddingTop:'5px', position: "absolute", right: 35}} /> </a></div>} >
            {/* Added a child element to satisfy the expected 'children' prop */}
            <ServicessPage />
        </DashboardCard>
    );
};

export default Services;