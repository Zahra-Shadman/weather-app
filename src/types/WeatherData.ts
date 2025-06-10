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
export interface IdataFetcherProps {
  city: string;
  onDataFetched: (data: IWeatherData | null) => void;
  onError: (error: string | null) => void;
  onLoading: (loading: boolean) => void;
}