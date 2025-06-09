import React, { useEffect } from "react";
import axios from "axios";
import type {
  IWeeklyDataFetcherProps,
  IWeeklyWeatherData,
} from "../../types/weeklyDate";

const WeeklyDataFetcher: React.FC<IWeeklyDataFetcherProps> = ({
  city,
  onDataFetched,
  onError,
  onLoading,
}) => {
  useEffect(() => {
    const fetchWeeklyWeather = async () => {
      onLoading(true);
      try {
        const apiKey = "af6bc152abc4d156f76123808f36e39f";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get<IWeeklyWeatherData>(url);
        onDataFetched(response.data);
        onError(null);
      } catch (err) {
        onError("Error fetching weekly data");
        console.error("Error fetching weekly data:", err);
      } finally {
        onLoading(false);
      }
    };

    if (city) {
      fetchWeeklyWeather();
    }
  }, [city, onDataFetched, onError, onLoading]);

  return null;
};

export default WeeklyDataFetcher;
