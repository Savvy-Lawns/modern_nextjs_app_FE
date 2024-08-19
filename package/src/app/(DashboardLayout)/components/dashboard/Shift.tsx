import React, { useState, useEffect, useRef } from 'react';
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
import { BorderRight } from '@mui/icons-material';

declare global {
    interface Window {
        initMap: () => void;
    }
}
const windowHeightServices = window.innerHeight*.25;
const windowHeightMap = window.innerHeight*.3;


const LinkStyled = styled('div')({
    width: "100%",
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    padding: "0px 0px 5px 0px",
    marginBottom: "20px",
    
    backgroundColor: baselightTheme.palette.primary.light, 
    boxShadow: "inset 0px -8px 10px 1px rgba(0,0,0,0.75), 0px 7px 10px 1px rgba(0,0,0,0.75)",
});

const mapContainerStyle = {
    width: '96%',
    height: `${windowHeightMap}px`,
    marginTop: '3px',
    marginBottom: '4px',
    BorderRadius: '45px',
};

const NextRoute = () => {
    const [firstService, setFirstService] = useState<string | null>(null);
    const [token, setToken] = useState<string | undefined>('');
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setToken(Cookie.get('token'));
        if (!token) {
            console.error('Token not found. User must be authenticated.');
            return;
        }
    }, [token]);

    const handleSetFirstService = (service: string) => {
        setFirstService(service);
    };

    const urlAddress = firstService?.replaceAll(" ", "+");

    const googleMapsApiKey = process.env.G_API ;

    useEffect(() => {
        
        window.initMap = () => {
            if (mapRef.current && firstService) {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: firstService }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const map = new google.maps.Map(mapRef.current as HTMLElement, {
                            center: results[0].geometry.location,
                            zoom: 15,
                        });
                        const marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                        });
                    } else {
                        console.error('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        };
    
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }, [firstService, googleMapsApiKey]);

    return (
        <DashboardCard title="Today's Shift">
            <LinkStyled>
                <div ref={mapRef} style={mapContainerStyle}></div>
                {/* <iframe
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAl3RquFEaUpVrsF94qYCPPfucPqCwCuj4
                        &q=Space+Needle,Seattle+WA">
                </iframe> */}
            </LinkStyled>
            <ShiftButtons token={token} mileage_start={localStorage.getItem('end_mileage')} />
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
        height: `${windowHeightServices}px`,
        maxHeight: '59vh',
        marginBottom: '-45px',
        marginTop: '15px',
    },
    dayButton: {
        marginTop: 10,
        borderRadius: 25,
        color: 'white',
    }
};