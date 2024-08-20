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

const RouteOptimizer: React.FC<RouteOptimizerProps> = ({ listOfAddresses, mapsKey }) => {
  const [addresses, setAddresses] = useState<string[]>(listOfAddresses);
  const [optimizedRoute, setOptimizedRoute] = useState<any>(null);
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
        if (status === google.maps.DirectionsStatus.OK) {
          setOptimizedRoute(result);
          console.log(result);
        } else {
          console.error('Error optimizing route:', status);
        }
      });
    } catch (error) {
      console.error('Error optimizing route:', error);
    }
  };

  return (
    <Button style={styles.routeButton} variant="contained" color="secondary" onClick={handleOptimize}>
      Organize Route
    </Button>
  );
};

export default RouteOptimizer;

const styles: {
    routeButton: React.CSSProperties;
   
  } = {
    routeButton: {
      marginTop: '0px',
      borderRadius: 25,
      color: 'white',
    },
  
  };