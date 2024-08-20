"use-client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { Select, MenuItem, Button, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import TodaysServices from './todaysServices';
import ShiftButtons from './ShiftButtons';
import withAuth from '@/utils/withAuth';
import Cookie from 'js-cookie';
import { BorderRight } from '@mui/icons-material';
import useFetchShiftServices from './shiftServices';
import { text } from 'stream/consumers';

declare global {
  interface Window {
    initMap: () => void;
  }
}

const LinkStyled = styled('div')({
  width: "100%",
  overflow: "auto",
  display: "flex",
  justifyContent: "center",
  padding: "0px 0px 5px 0px",
  marginBottom: "20px",
  backgroundColor: baselightTheme.palette.primary.light, 
  boxShadow: "inset 0px -8px 10px 1px rgba(0,0,0,0.75), 0px 7px 10px 1px rgba(0,0,0,0.75)",
  borderRadius: "15px",
});

const NextRoute = () => {
  const [firstService, setFirstService] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>(Cookie.get('token'));
  const mapRef = useRef<HTMLDivElement>(null);
  const { shiftServices, loading, error } = useFetchShiftServices();
  const [services, setServices] = useState<any[]>([]);
  const [addressList, setAddressList] = useState<any[]>([]);
  const [windowHeightServices, setWindowHeightServices] = useState<number>(window.innerHeight * 0.9);
  const [windowHeightMap, setWindowHeightMap] = useState<number>(window.innerHeight * 0.3);

  console.log('mapRef:', mapRef);



  useEffect(() => {
    const initializeData = async () => {
        try {
            // Set services asynchronously
            await setServices(shiftServices);

            // Check if services exist
            if (services && services.length > 0) {
                // Set the first service
                await setFirstService(services[0].customer_address);

                // Set the address list
                await setAddressList(services.map((customer: any) => {
                    console.log('customer:', customer);
                    console.log('customer.customer_address:', customer.customer_address);
                    return customer.customer_address;
                }));
            } else {
                console.log('services is not defined or empty', services);
            }
        } catch (error) {
            console.error('Error setting initial data:', error);
        }
    };

    initializeData();
}, [shiftServices]);

console.log('addressList after UseEffect:', addressList);
  

  

  const handleSetFirstService = (service: string) => {
    setFirstService(service);
  };

  const googleToken = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 

  useEffect(() => {
    const initializeMap = () => {
      if (typeof window !== 'undefined') {
        let geocoder: google.maps.Geocoder;
        let map: google.maps.Map;
  
        const codeAddress = (address: string) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              map.setCenter(results[0].geometry.location);
              new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        };
  
        window.initMap = () => {
          geocoder = new google.maps.Geocoder();
          const mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(0, 0) // Temporary center, will be updated by codeAddress
          };
          map = new google.maps.Map(mapRef.current as HTMLElement, mapOptions);
  
          if (firstService) {
            codeAddress(firstService);
          } else {
            console.error('firstService is not defined');
          }
        };
  
        // Check if the script is already present
        const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${googleToken}&callback=initMap&libraries=places&loading=async`;
        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
          const script = document.createElement('script');
          script.src = scriptUrl;
          script.async = true;
          script.defer = true;
          script.onerror = () => {
            console.error('Failed to load the Google Maps script');
          };
          document.head.appendChild(script);
  
          return () => {
            document.head.removeChild(script);
          };
        } else {
          // If the script is already present, manually call the initMap function
          if (window.google && window.google.maps) {
            window.initMap();
          }
        }
      }
    };
  
    initializeMap();
  }, [firstService, googleToken]);


  return (
    <DashboardCard title="Today's Shift">
      {Array.isArray(services) && services.length > 0 ? (
        <div style={styles.scrollContainer}>
          <LinkStyled>
            <div ref={mapRef} style={{ ...mapContainerStyle, height: `${windowHeightMap}px` }}></div>
          </LinkStyled>
          <ShiftButtons token={token} mileage_start={localStorage.getItem('end_mileage')} listOfAddresses={addressList} mapsKey={googleToken} />
          <TodaysServices onSetFirstService={handleSetFirstService} />
        </div>
      ) : (
        <div>
          <Typography variant='h3'>There is no Events for today</Typography>
        </div>
      )}
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
    height: `100%`,
    maxHeight: '65vh',
    marginBottom: '-45px',
    marginTop: '15px',
  },
  dayButton: {
    marginTop: 10,
    borderRadius: 25,
    color: 'white',
  }
};

const mapContainerStyle = {
  width: `92%`,
  height: '30vh', // Default height, will be updated in useEffect
  marginTop: '3px',
  marginBottom: '4px',
  borderRadius: '15px',
  textAlign: 'center',
};