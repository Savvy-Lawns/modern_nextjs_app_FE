import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link  from 'next/link';
import { styled } from "@mui/material";

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { IconBorderRadius } from '@tabler/icons-react';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }
  
   
    
  

const AuthRegister = ({ title, subtitle, subtext }: registerType) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={0}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={4}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="3px">Name</Typography>
               
                <CustomTextField id="name" variant="outlined" fullWidth BorderRadius='45px' />
               
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="3px" mt="15px">Email Address</Typography>
                
                <CustomTextField id="email" variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="3px" mt="15px">Password</Typography>
                <CustomTextField id="password" variant="outlined" fullWidth />
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="3px" mt="15px">Phone Number</Typography>
                <CustomTextField id="phone" variant="outlined" fullWidth />
                
            </Stack>
            <Button color="primary" variant="contained" size="large"  fullWidth component={Link} href="/authentication/login">
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthRegister;
