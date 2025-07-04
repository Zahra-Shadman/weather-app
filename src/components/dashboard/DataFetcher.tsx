import React, { useEffect } from "react";
import axios from "axios";
import type { IdataFetcherProps, IWeatherData } from "../../types/WeatherData";




const DataFetcher: React.FC<IdataFetcherProps> = ({ city, onDataFetched, onError, onLoading }) => {
  useEffect(() => {
    const fetchWeather = async () => {
      onLoading(true);
      try {
        const apiKey = "af6bc152abc4d156f76123808f36e39f";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get<IWeatherData>(url);
        onDataFetched(response.data);
        onError(null);
      } catch (err) {
        onError("Error fetching weather data");
        console.error("Error fetching weather data:", err);
      } finally {
        onLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city, onDataFetched, onError, onLoading]);

  return null;
};

export default DataFetcher;