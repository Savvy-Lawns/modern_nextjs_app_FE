"use-client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import EditOverlay from '../components/overlay';
import { active, Users } from '@/app/Admin/users/users';
import { useLocation } from 'react-router-dom';





const Customers = ( ) => {
    
    const selection = Number(active.selection);

    

   
    return (

        <DashboardCard title="Edit User" >
            
            
              <EditOverlay  /> 
                
           
        </DashboardCard>
    );
};

export default Customers;
