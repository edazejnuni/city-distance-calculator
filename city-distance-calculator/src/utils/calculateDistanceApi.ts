import { calculateDistance } from './distanceUtil'; 

 interface CityInfo {
    value: string;
    label: string;
    latitude: number;
    longitude: number;
  }

  interface DistanceInfo {
    startCity: string;
    finalCity: string;
    distance: number;
  }

export async function calculateDistances(cityCoordinates: CityInfo[]): Promise<DistanceInfo[]> {
    try {
      const distances: DistanceInfo[] = [];
  
      for (let i = 0; i < cityCoordinates.length - 1; i++) {
        const startCity = cityCoordinates[i];
        const endCity = cityCoordinates[i + 1];
  
        const distance = calculateDistance(
          startCity.latitude,
          startCity.longitude,
          endCity.latitude,
          endCity.longitude
        );
  
        distances.push({
          startCity: startCity.value,
          finalCity: endCity.value,
          distance: distance,
        });
      }
  
      return distances;
    } catch (error) {
      console.error('Error calculating distances:', error);
      throw error;
    }
  }
  