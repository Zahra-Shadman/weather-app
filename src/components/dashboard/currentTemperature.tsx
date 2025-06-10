import { IoLocation } from "react-icons/io5";
import DateTimeDisplay from "./DateTime";
import React, { useState } from "react";
import WeatherImageSelector from "./imageSelector";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DataFetcher from "./DataFetcher";
import type {
  ICurrentTemperatureProps,
  IWeatherData,
} from "../../types/WeatherData";

const CurrentTemperature: React.FC<ICurrentTemperatureProps> = ({ city }) => {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="weather-container">
      <DataFetcher
        city={city}
        onDataFetched={setWeather}
        onError={setError}
        onLoading={setLoading}
      />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {error && <p className="error">{error}</p>}
      {weather && (
        <section className="flex flex-1/2 justify-between">
          <div className="flex flex-col justify-center p-4">
            <div className="flex bg-[#CDD9E0] rounded-full p-4 font-normal h-10 flex-row w-full gap-2 text-[#3D4852] items-center">
              <IoLocation />
              <h1 className="px-2">{weather.name}</h1>
            </div>
            <div className="flex flex-col">
              <DateTimeDisplay />
            </div>
            <div>
              <h1 className="text-[#003464] text-4xl font-bold">
                {Math.round(weather.main.temp)}°C
              </h1>
              <span className="text-sm text-[#3D4852] flex gap-2">
                High: {Math.round(weather.main.temp_max)}
                <span>Low: {Math.round(weather.main.temp_min)}</span>
              </span>
            </div>
          </div>
          <div className="py-2 px-3">
            <WeatherImageSelector
              description={weather.weather[0].description}
            />
            <h1 className="text-3xl text-[#003464] font-light capitalize">
              {weather.weather[0].description}
            </h1>
            <h2 className="py-1 text-sm text-[#3D4852]">
              Feels Like {Math.round(weather.main.feels_like)}°C
            </h2>
          </div>
        </section>
      )}
    </div>
  );
};

export default CurrentTemperature;
