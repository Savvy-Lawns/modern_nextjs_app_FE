"use-client";
import React from 'react';
import Link from "next/link";
import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { ArrowBack, Refresh } from '@mui/icons-material';

import FinancePage from '../components/financepage';

const Finance = () => {
    return (
        <DashboardCard title={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="/Admin">
                    <ArrowBack style={{ paddingTop: '5px', position: "absolute", left: 35 }} />
                </a> 
                Finance
                <a href='/Admin/finance'>
                    <Refresh style={{ paddingTop: '5px', position: "absolute", right: 35 }} />
                </a>
            </div>
        }>
            <FinancePage />
        </DashboardCard>
    );
};

export default Finance;