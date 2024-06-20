"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { baselightTheme } from "@/utils/theme/DefaultColors";

const Login2 = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            backgroundColor: baselightTheme.palette.primary.light,
            
            animation: "gradient 15s ease infinite",
            
            height: "100%",
            width: "100%",
            
          },
        }}
      ><Logo />
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
              sx={{ px: 4, py:2, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                
              </Box>
              <AuthLogin
                subtext={
                  <Typography
                    variant="h4"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  >
                    Login
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/authentication/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Create an account
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
};
export default Login2;
