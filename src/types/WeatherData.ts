export interface IWeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

export interface ICurrentTemperatureProps {
  city: string;
}
