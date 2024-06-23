import React from 'react';
import Link from "next/link";

import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';

const JobsPage = () => {
    return (
        <DashboardCard title="Jobs">
            {/* Added a child element to satisfy the expected 'children' prop */}
            <div>Customer content goes here</div>
        </DashboardCard>
    );
};

export default JobsPage;