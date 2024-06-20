import React from 'react';
import Link from "next/link";

import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import RecentTransactions from './RecentTransactions';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const LinkStyled = styled(Link)(() => ({
    
    width: "100%",
    overflow: "visible",
    display: "flex",
    justifyContent: "center",
    padding: "3px 3px 5px 3px",
    marginBottom: "20px",
    borderRadius: "25px",
    backgroundColor: baselightTheme.palette.primary.light, 
    boxShadow: "inset 0px -8px 10px 1px rgba(0,0,0,0.75), 0px 7px 10px 1px rgba(0,0,0,0.75)",
    
    
  }));

const NextRoute = ( ) => {

    

    return (

        <DashboardCard title="Today's Shift Next Route" footer={<RecentTransactions />}>
            
            <LinkStyled href="">
              
            </LinkStyled>
                {/* <Button color="primary" variant="contained" size="large"  fullWidth component={Link} href="/authentication/login"/> */}
                
           
        </DashboardCard>
    );
};

export default NextRoute;
