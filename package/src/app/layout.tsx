"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import {UserProvider} from './Admin/components/userContext'
import {ServiceProvider} from './Admin/components/serviceContext'
import { CustomerProvider } from "./Admin/components/customerContext";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) 


{
  
  return (
    <html lang="en">
      <body style={{backgroundColor:baselightTheme.palette.primary.light}}>
        <BrowserRouter>
        <UserProvider>
        <ServiceProvider>
        <CustomerProvider>
        <ThemeProvider theme={baselightTheme}>
        
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
        </CustomerProvider>
        </ServiceProvider>
        </UserProvider>
        </BrowserRouter>
      </body>
    </html>
  );
}
