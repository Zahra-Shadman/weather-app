import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import type { IDataFetcherProps, IWeatherData } from "../../types/WeatherData";

const DataFetcher: React.FC<IDataFetcherProps> = ({
  city,
  apiKey,
  units = "metric",
  lang = "en",
  children,
}) => {
  const [data, setData] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [triggerFetch, setTriggerFetch] = useState<number>(0);

  useEffect(() => {
    if (!city || !apiKey) return;

    setLoading(true);
    setError(null);

    const source = axios.CancelToken.source();

    axios
      .get<IWeatherData>("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: apiKey,
          units,
          lang,
        },
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      source.cancel("Component unmounted or new request");
    };
  }, [city, apiKey, units, lang, triggerFetch]);

  const refetch = () => setTriggerFetch((prev) => prev + 1);

  return <>{children({ loading, error, data, refetch })}</>;
};

export default DataFetcher;
