"use client";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthForgot from "../auth/AuthForgot";

const ForgotPassword = () => (
  <PageContainer title="Forgot" description="this is Forgot password page">
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #D5ECDC, #9FC499)",
          backgroundSize: "100% 100%",
          animation: "gradient 15s ease infinite",
          position: "relative",
          height: "100%",
          width: "100%",
          opacity: "0.2",
        },
      }}
    ><Box style={{}} display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ px: 4, py: 2,  width: "100%", maxWidth: "500px" }}
          >
            
            <AuthForgot
              subtext={
                <Typography
                  variant="h4"
                  textAlign="center"
                  color="textSecondary"
                  mb={1}
                >Forgot Password</Typography>
              }
              subtitle={
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={1}
                  mt={3}
                >
                  <Typography
                    color="textPrimary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Rememebered?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/authentication/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default ForgotPassword;
