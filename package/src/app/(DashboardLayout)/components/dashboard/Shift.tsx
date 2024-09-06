"use-client";
import React, { useState, useEffect, useRef } from 'react';
import {  Button, styled, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import TodaysServices from './todaysServices';
import ShiftButtons from './ShiftButtons';
import withAuth from '@/utils/withAuth';
import Cookie from 'js-cookie';
import { BorderRight } from '@mui/icons-material';
import useFetchShiftServices, { reorderShiftServices } from './shiftServices';
import { text } from 'stream/consumers';
import { getOptimizedAddresses } from './routeOptimization';
import { IconRoute } from '@tabler/icons-react';
import { set } from 'lodash';


declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Service {
  customer_address: string;
  // Add other properties of Service here
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
  
  const [token, setToken] = useState<string | undefined>(Cookie.get('token'));
  const mapRef = useRef<HTMLDivElement>(null);
  const { shiftServices, loading, error } = useFetchShiftServices();
  const [services, setServices] = useState<any[]>([shiftServices]);
  const [addressList, setAddressList] = useState<any[]>([]);
  const [windowHeightServices, setWindowHeightServices] = useState<number>(window.innerHeight * 0.9);
  const [windowHeightMap, setWindowHeightMap] = useState<number>(window.innerHeight * 0.3);
  const [optimized, setOptimized] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
 
  const [firstService, setFirstService] = useState<string |
   any>(shiftServices[0]?.customer_address || null);
  const googleToken = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
 // console.log('mapRef:', mapRef);
 // console.log('shiftServices TOP:', shiftServices);
 // console.log('first address TOP:', shiftServices[0]);

  

  const runOptimization = async () => {
    
    try {
     // console.log('Starting optimization...');
    const optimizedAddresses = await getOptimizedAddresses(addressList, googleToken);
   // console.log('Optimized Addresses:', optimizedAddresses);
    const reorderedServices = await reorderShiftServices(shiftServices, optimizedAddresses, setOptimized);
   // console.log('Reordered Services:', reorderedServices);
    setServices(reorderedServices);
    setOptimized(true);
    localStorage.setItem('optimized', 'true');
   // console.log('Optimization complete.');
    } catch (error) {
      console.error('Error optimizing route:', error);
    }
  };
  
  const handleOptimize = async () => {
      if (optimized) {
        setOpenDialog(true);
      } else {
        await runOptimization();
      }
    };

  const HandleFetch = () =>  useFetchShiftServices();

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check if services exist
       // console.log('shiftServices initializing data:', shiftServices);
        if (shiftServices && shiftServices.length > 0) {
          // Set the first service after a delay
          setTimeout(() => {
            setFirstService(shiftServices[0].customer_address);
          }, 2000);

          // Log and set the address list
          const addresses = shiftServices.map((customer: any) => {
           // console.log('customer:', customer);
           // console.log('customer.customer_address:', customer.customer_address);
            return customer.customer_address;
          });
          await setAddressList(addresses);
          if (localStorage.getItem('optimized') === 'true') {
            setOptimized(true);
          } else setOptimized(false);
         // console.log('right before addresses:', shiftServices);
        } else {
          // Handle case where services are not defined or empty
          
         // console.log('services is not defined or empty', shiftServices);
        }
      } catch (error) {
        console.error('Error setting initial data:', error);
      }
    };

    initializeData();
  }, [shiftServices]);

// console.log('first  address UseEffect:', firstService);



  

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = async () => {
    setOpenDialog(false);
    await runOptimization();
  };

  const handleSetFirstService = (service: string) => {
    setFirstService(service);
  };

  

  useEffect(() => {
    const initializeMap = () => {
      if (typeof window !== 'undefined' && mapRef.current) {
        let geocoder: google.maps.Geocoder;
        let map: google.maps.Map;

        const codeAddress = (address: string) => {
         // console.log('code address:', address);
          geocoder.geocode({ address }, (results, status) => {
           // console.log('code address:', address);
            if (status === 'OK' && results && results[0]) {
              map.setCenter(results[0].geometry.location);
              const marker:any = new google.maps.Marker({

                map: map,
                position: results[0].geometry.location
              });

              marker.addListener('click', () => {
                const destination = `${marker.position.lat()},${marker.position.lng()}`;
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
              });

            } else {
             // console.log(`Geocode was not successful for ${address}`);
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        };

        window.initMap = () => {
          geocoder = new google.maps.Geocoder();
          const mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(0, 0), // Temporary center
            disableDefaultUI: false,
            clickableIcons: true,
          };
          map = new google.maps.Map(mapRef.current as HTMLElement, mapOptions);
         // console.log('firstService before code address:', firstService);
          if (firstService !== null|| firstService !== undefined) {
           // console.log('firstService if statement:', firstService);
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
    <DashboardCard title={<div style={{display:'flex', justifyContent:'center'}}>Today&apos;s Shift<Button variant="outlined" color="primary" onClick={handleOptimize} style={{paddingTop:'5px', position: "absolute", right: 35}} ><IconRoute /></Button></div>}>
      {Array.isArray(shiftServices) && shiftServices.length > 0 ? (
       // console.log('services map success:', shiftServices),
        <div style={styles.scrollContainer}>
          <LinkStyled>
            <div ref={mapRef} style={{ ...mapContainerStyle, height: `${windowHeightMap}px` }}></div>
          </LinkStyled>
          <ShiftButtons token={token} mileage_start={localStorage.getItem('end_mileage')} listOfAddresses={addressList} mapsKey={googleToken}  />
          <TodaysServices onSetFirstService={handleSetFirstService} />
        </div>
      ) : (
       // console.log('services map failure:', shiftServices),
        <div>
          <Typography variant='h3'>There is no Events for today</Typography>
        </div>
      )}
      
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Route Optimization</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The route has already been optimized. Are you sure you want to optimize again?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
    width: '92%',
    height: '30vh', // Default height, will be updated in useEffect
    marginTop: '3px',
    marginBottom: '4px',
    borderRadius: '15px',
    textAlign: 'center' as 'center', // Type assertion
  };
