"use client"
import React from 'react';
import Link from "next/link";

import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import AdminNavBar from './components/adminpages';
import withAuth from '@/utils/withAuth';





const Navigation = ( ) => {

    

    return (

        <DashboardCard title="Admin Navigation" >
            
            
                <AdminNavBar />
                
           
        </DashboardCard>
    );
};

export default withAuth(Navigation);
