import { useState, useEffect } from 'react';
import {
  getCurrentLocation,
  getLocationName,
  calculateDistance,
  formatDistance,
} from '../utils/locationUtils';
import { useToast } from '@chakra-ui/toast';

interface LocationState {
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  locationName: string;
  isLoading: boolean;
  error: string | null;
}

export const useLocation = () => {
  const [locationState, setLocationState] = useState<LocationState>({
    coordinates: null,
    locationName: '',
    isLoading: false,
    error: null,
  });

  const toast = useToast();

  const fetchLocation = async () => {
    setLocationState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const coordinates = await getCurrentLocation();
      const locationName = await getLocationName(coordinates);

      setLocationState({
        coordinates,
        locationName,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get location';
      setLocationState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast({
        title: 'Location Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getDistanceToEvent = (
    eventCoordinates: { latitude: number; longitude: number }
  ): string | null => {
    if (!locationState.coordinates) return null;

    const distance = calculateDistance(
      locationState.coordinates,
      eventCoordinates
    );
    return formatDistance(distance);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {
    ...locationState,
    refreshLocation: fetchLocation,
    getDistanceToEvent,
  };
}; 