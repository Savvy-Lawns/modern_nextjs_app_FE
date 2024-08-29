import React from "react";
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

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthForgot = ({ title, subtitle, subtext }: loginType) => (
  <>
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
          Email
        </Typography>
        <CustomTextField variant="outlined" fullWidth />
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
  <Link href="/authentication/login" passHref>
    <Button
      color="primary"
      variant="contained"
      size="large"
      fullWidth
      type="submit"
      onClick={() => alert('Email sent')}
      sx={{ borderRadius: '45px' }} // Apply custom styles using sx prop
    >
      Submit
    </Button>
  </Link>
  </Box>
    {subtitle}
  </>
);

export default AuthForgot;
