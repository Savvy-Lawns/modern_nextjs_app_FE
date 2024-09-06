  
  import { useState, useEffect } from 'react';
  import { Button } from '@mui/material';
interface Location {
    latitude: number;
    longitude: number;
  }
  
  interface RouteOptimizerProps {
    listOfAddresses: string[];
    mapsKey: string;
  }

  
  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };
  
  const RouteOptimizer: React.FC<RouteOptimizerProps> = ({ listOfAddresses, mapsKey }) => {
    const [addresses, setAddresses] = useState<string[]>(listOfAddresses);
    const [optimizedRoute, setOptimizedRoute] = useState<string[]>([]);
    const [totalDriveTime, setTotalDriveTime] = useState<number>(0);
    const [routeOptions, setRouteOptions] = useState<any[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location>({ latitude: 0, longitude: 0 });
  
    useEffect(() => {
      const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      };
  
      loadGoogleMapsScript();
    }, [mapsKey]);
  
    const handleOptimize = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        setCurrentLocation(currentLocation);
  
        const directionsService = new google.maps.DirectionsService();
  
        const waypoints = addresses.map((address) => ({
          location: address,
          stopover: true,
        }));
  
        const request = {
          origin: new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
          destination: new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        };
  
        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            const optimizedOrder = result.routes[0].waypoint_order;
  
            const totalTimeInSeconds = result.routes[0].legs.reduce((sum, leg: any) => sum + leg.duration.value, 0);
            const totalDistanceInMeters = result.routes[0].legs.reduce((sum, leg: any) => sum + leg.distance.value, 0);
                
            setTotalDriveTime(totalTimeInSeconds);
  
            const routeOptions = result.routes.map((route) => ({
              optimizedOrder: route.waypoint_order,
              totalTime: route.legs.reduce((sum, leg: any) => sum + leg.duration.value, 0),
              totalDistance: route.legs.reduce((sum, leg: any) => sum + leg.distance.value, 0),
            }));
            setRouteOptions(routeOptions);

            const orderedAddresses = result.routes[0].legs.map((leg: any) => leg.end_address);
            orderedAddresses.pop(); // Remove the last address as per the requirement

        setOptimizedRoute(orderedAddresses);
        localStorage.setItem('optimizedRoute', JSON.stringify(orderedAddresses));
          } else {
            console.error('Error optimizing route status:', status);
          }
        });
      } catch (error) {
        console.error('Error optimizing route error:', error);
      }
    };
  
    return (
      <Button style={styles.routeButton} variant="contained" color="secondary" onClick={handleOptimize}>
        Organize Route
      </Button>
    );
  };
  
  export default RouteOptimizer;

  const validateAddresses = async (addresses: string[], mapsKey: string): Promise<string[]> => {
    const geocoder = new google.maps.Geocoder();
    const validatedAddresses: string[] = [];
  
    for (const address of addresses) {
      const result = await new Promise((resolve, reject) => {
       // console.log('address forloop validate:', address);
        geocoder.geocode({ address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            resolve(results[0].formatted_address);
           // console.log('results:', results[0].formatted_address);
          } else {
           // console.log('Geocode was not successful for ', address);
            reject(`Geocode was not successful for the following reason: ${status} for address: ${address}`);
          }
        });
      }).catch(error => {
        console.error(error);
        return null;
      });
  
      if (result) {
        validatedAddresses.push(result as string);
      }
    }
  
    return validatedAddresses;
  };
  
  export const getOptimizedAddresses = async (addresses: string[], mapsKey: string): Promise<string[]> => {
    const currentLocation = await getCurrentLocation();
    const directionsService = new google.maps.DirectionsService();
   // console.log('addresses:', addresses);

    const validatedAddresses = await validateAddresses(addresses, mapsKey);
  if (validatedAddresses.length === 0) {
    throw new Error('No valid addresses found');
  }
  
    const waypoints = addresses.map((address:any ) => ({
      location: address,
      stopover: true,
    }));
  
    const request = {
      origin: new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
      destination: new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  
    return new Promise((resolve, reject) => {
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const optimizedOrder = result.routes[0].waypoint_order;
          resolve(optimizedOrder.map((index: number) => addresses[index]));
        } else {
          reject('Error optimizing route');
        }
      });
    });
  };
  
  const styles: {
    routeButton: React.CSSProperties;
  } = {
    routeButton: {
      marginTop: '0px',
      borderRadius: 25,
      color: 'white',
    },
  };