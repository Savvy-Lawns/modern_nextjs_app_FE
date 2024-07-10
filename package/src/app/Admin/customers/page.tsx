"use client";
import React from 'react';
import Link from "next/link";

import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { ArrowBack, Refresh } from '@mui/icons-material';
import CustomerPage from '../components/customerpage';
import withAuth from '@/utils/withAuth';

const Customers = () => {
    return (
        <DashboardCard title={<div style={{display:'flex', justifyContent:'center'}}><a href="/Admin"><ArrowBack style={{paddingTop: '5px', position: "absolute", left: 35,}} /></a> Customers<a href='/Admin/customers'><Refresh style={{paddingTop:'5px', position: "absolute", right: 35}} /> </a></div>} >
            {/* Added a child element to satisfy the expected 'children' prop */}
            <CustomerPage />
        </DashboardCard>
    );
};

export default withAuth(Customers);