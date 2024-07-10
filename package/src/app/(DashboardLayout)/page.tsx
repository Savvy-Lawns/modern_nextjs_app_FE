'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import NextRoute from '@/app/(DashboardLayout)/components/dashboard/Shift';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import withAuth from '@/utils/withAuth';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <div style={{backgroundColor: baselightTheme.palette.primary.light}}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={8}>
            <NextRoute  />
          </Grid>
          
          
          
           
          </Grid>
          </div>
      
    </PageContainer>
  )
}

export default withAuth(Dashboard);
