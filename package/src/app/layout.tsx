"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './Admin/components/userContext';
import { ServiceProvider } from './Admin/components/serviceContext';
import { CustomerProvider } from "./Admin/components/customerContext";
import { ExpenseProvider } from "./Admin/components/expenseContext";
import withClientSideCheck from "@/utils/csc";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body style={{ backgroundColor: baselightTheme.palette.primary.light }}>
        <BrowserRouter>
          <UserProvider>
            <ServiceProvider>
              <CustomerProvider>
                <ExpenseProvider>
                  <ThemeProvider theme={baselightTheme}>
                    <CssBaseline />
                    {children}
                  </ThemeProvider>
                </ExpenseProvider>
              </CustomerProvider>
            </ServiceProvider>
          </UserProvider>
        </BrowserRouter>
      </body>
    </html>
  );
};

export default withClientSideCheck(RootLayout);