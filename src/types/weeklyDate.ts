export interface IWeeklyDataFetcherProps {
  city: string;
  onDataFetched: (data: IWeeklyWeatherData | null) => void;
  onError: (error: string | null) => void;
  onLoading: (loading: boolean) => void;
}
export interface IWeatherItem {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface IWeeklyWeatherData {
  list: IWeatherItem[];
  city: {
    name: string;
  };
}

export interface IWeekForecastProps {
  city: string;
}

export interface IDailyForecast {
  date: string;
  dayName: string;
  temp: number;
  description: string;
  icon: string;
}
