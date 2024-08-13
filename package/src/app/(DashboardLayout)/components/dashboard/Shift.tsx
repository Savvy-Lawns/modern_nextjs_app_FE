import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import TodaysServices from './todaysServices';
import ShiftButtons from './ShiftButtons';
import withAuth from '@/utils/withAuth';
import Cookie from 'js-cookie';
import AddForm from '@/app/Admin/components/add';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LinkStyled = styled(Link)(() => ({
    width: "100%",
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    padding: "3px 3px 5px 3px",
    marginBottom: "20px",
    borderRadius: "25px",
    backgroundColor: baselightTheme.palette.primary.light, 
    boxShadow: "inset 0px -8px 10px 1px rgba(0,0,0,0.75), 0px 7px 10px 1px rgba(0,0,0,0.75)",
}));

const NextRoute = () => {
    const [firstService, setFirstService] = useState<string | null>(null);
    const [token, setToken] = useState<string | undefined>('');


    useEffect(() => {
    
      setToken(Cookie.get('token'));
      if (!token) {
        console.error('Token not found. User must be authenticated.');
        return;
      }
    });
    console.log('first service', firstService);
    const handleSetFirstService = (service: string) => {
        setFirstService(service);
    };
    console.log('first service', firstService);

    const urlAddress = firstService?.replace(" ", "_");

    return (
        <DashboardCard title="Today's Shift">
            <LinkStyled href={`https://www.google.com/maps/?q=${urlAddress}&maptype=satellite`}>
                <div>
                    <iframe
                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.551961921518!2d-105.06565002341642!3d40.4851759714287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87694d1c6d535655%3A0x5e0439b762d845fb!2s802%20Snowy%20Plain%20Rd%2C%20Fort%20Collins%2C%20CO%2080525!5e0!3m2!1sen!2sus!4v1718825483529!5m2!1sen!2sus&zoom=18&maptype=satellite"
                        width="100%"
                        height="300"
                        loading="lazy"
                        style={{ borderRadius: 25, border: "0 solid #000", marginTop: 2 }}
                    ></iframe>
                </div>
            </LinkStyled>
            <ShiftButtons  token={token} mileage_start={0}   />
            <div style={styles.scrollContainer}>
                <TodaysServices onSetFirstService={handleSetFirstService} />
            </div>
        </DashboardCard>
    );
};

export default withAuth(NextRoute);

const styles: {
    scrollContainer: React.CSSProperties;
    dayButton: React.CSSProperties;
} = {
    scrollContainer: {
        overflowY: 'scroll',
        height: '59vh',
        marginBottom: '-45px',
        marginTop: '15px',
    },
    dayButton: {
        marginTop: 10,
        borderRadius: 25,
        color: 'white',
    }
};