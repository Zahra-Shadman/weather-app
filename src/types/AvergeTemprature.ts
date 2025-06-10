export interface IAverageTemperatureProps {
  city: string;
}

export interface IAverageWeatherData {
  month: string;
  temperature: number;
}

export interface ICityCoordinates {
  [key: string]: {
    latitude: number;
    longitude: number;
  };
}