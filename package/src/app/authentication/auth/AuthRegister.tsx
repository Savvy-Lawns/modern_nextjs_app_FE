"use client";
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation'

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    
      //const apiURL =  process.env.NEXT_PUBLIC_API_URL
const apiURL =  'http://127.0.0.1:3000/api/v1'

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        // Collect form data
        const userData = {
            user: {
                username: (document.getElementById('username') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
                password: (document.getElementById('password') as HTMLInputElement).value,
                password_confirmation: (document.getElementById('password_confirmation') as HTMLInputElement).value,
                role: 1,
                phone_number: (document.getElementById('phone') as HTMLInputElement).value,
            }
        };
    
       // console.log(JSON.stringify(userData));
        
    
        if (!userData.user.username || !userData.user.email || !userData.user.password || !userData.user.password_confirmation || !userData.user.phone_number) {
            console.error('Please fill in all fields.');
            return; // Stop the form submission
        }
        if (userData.user.password !== userData.user.password_confirmation) {
            console.error('Passwords do not match.');
            return; // Stop the form submission
        }
    
        try {
            // Make the API call
            const response = await fetch(`${apiURL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Handle the response
            const result = await response.json();
           // console.log('User created:', result);
            alert(`User ${userData.user.username} was created successfully`);
            window.location.href = 'authentication/login';
            // Navigate to login page after successful registration
       
    
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle errors, show error messages
        }
        
    };
 
    
    
    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={0}>
                    {title}
                </Typography>
            )}
    
            {subtext}
    
            <form onSubmit={handleSubmit}>
                <Box>
                    <Stack mb={4}>
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='username' mb="3px">Name</Typography>
                        <CustomTextField id="username" variant="outlined" fullWidth />
    
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='email' mb="3px" mt="15px">Email Address</Typography>
                        <CustomTextField id="email" variant="outlined" fullWidth />
    
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='password' mb="3px" mt="15px">Password</Typography>
                        <CustomTextField id="password" variant="outlined" fullWidth />
    
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='password_confirmation' mb="3px" mt="15px">Confirm Password</Typography>
                        <CustomTextField id="password_confirmation" variant="outlined" fullWidth />
    
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='phone' mb="3px" mt="15px">Phone Number</Typography>
                        <CustomTextField id="phone" variant="outlined" fullWidth />
                    </Stack>
    
                    <Button type="submit" color="primary" variant="contained" size="large" onClick={handleSubmit}  fullWidth>
                       Sign Up
                    </Button>
                </Box>
            </form>
            {subtitle}
        </>
    );
    };
    
    export default AuthRegister;
