"use client"
import React, { useState,useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';



interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loginSuccess, setLoginSuccess] = useState(false); // Step 1: New state for tracking login success
  const [token, setToken] = useState(''); // Step 2: New state for storing the token
    const apiURL =  process.env.NEXT_PUBLIC_API_URL
// const apiURL =  'http://127.0.0.1:3000/api/v1'

  useEffect(() => {
    Cookie.remove('token');
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    let isMounted = true; 
  
    if (loginSuccess && isMounted) {
      router.push('/');
    }
  
    return () => {
      isMounted = false; // Clean up by marking component as unmounted
    };
  }, [loginSuccess, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(`${apiURL}/authentication/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
     // console.log({data});
  
      if (data && data.jwt) {
       // console.log(`Success`);
        Cookie.set('token', data.jwt, { expires: 7, secure: false, sameSite: 'lax' });
        setLoginSuccess(true);
        // Store token in a cookie
      } else {
       // console.log('failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  
  const handleTouchStart = (event:React.FormEvent) => {
    event.preventDefault();
    handleSubmit(event);
  };


  return (
    <form onSubmit={handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField variant="outlined" fullWidth value={email} onChange={handleEmailChange} />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField type="password" variant="outlined" fullWidth value={password} onChange={handlePasswordChange} />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onTouchStart={handleTouchStart}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;