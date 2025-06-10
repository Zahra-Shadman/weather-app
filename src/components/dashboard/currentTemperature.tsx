import { IoLocation } from "react-icons/io5";
import DateTimeDisplay from "./DateTime";
import React, { useState } from "react";
import WeatherImageSelector from "./imageSelector";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DataFetcher from "./DataFetcher";
import { useLanguage } from "../../utils/loginTranslator";
import type { IWeatherData } from "../../types/WeatherData";

interface ICurrentTemperaturePropsExtended {
  city: string;
  isDarkMode: boolean;
}

const CurrentTemperature: React.FC<ICurrentTemperaturePropsExtended> = ({
  city,
  isDarkMode,
}) => {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { language, isRTL } = useLanguage();

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return description;
  };

  // ترجمه‌های اضافی برای CurrentTemperature
  const temperatureTranslations = {
    en: {
      high: "High",
      low: "Low",
      feelsLike: "Feels Like",
      error: "Failed to fetch weather data",
    },
    fa: {
      high: "بیشترین",
      low: "کمترین",
      feelsLike: "دمای حسی",
      error: "دریافت اطلاعات آب‌وهوا ناموفق بود",
    },
  };

  // تعریف نوع با index signature
  interface WeatherDescription {
    [key: string]: string;
  }

  const weatherDescriptionTranslations: {
    en: WeatherDescription;
    fa: WeatherDescription;
  } = {
    en: {
      "clear sky": "Clear Sky",
      "few clouds": "Few Clouds",
      "scattered clouds": "Scattered Clouds",
      "broken clouds": "Broken Clouds",
      "shower rain": "Shower Rain",
      rain: "Rain",
      thunderstorm: "Thunderstorm",
      snow: "Snow",
      mist: "Mist",
    },
    fa: {
      "clear sky": "آسمان صاف",
      "few clouds": "کمی ابری",
      "scattered clouds": "ابرهای پراکنده",
      "broken clouds": "ابرهای شکسته",
      "shower rain": "باران رگباری",
      'rain': "باران",
      'thunderstorm': "رعد و برق",
      'snow': "برف",
      'mist': "مه",
      "overcast clouds": "پوشیده از ابر",
      "moderate rain": "باران معمولی",
      "light rain": "باران ملایم",
      'haze':"مه",
    },
  };

  const getTranslatedDescription = (description: string): string => {
    return (
      weatherDescriptionTranslations[language][description.toLowerCase()] ||
      description
    );
  };

  return (
    <div className="relative" dir={isRTL ? "rtl" : "ltr"}>
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

      {error && (
        <div className={`text-red-500 dark:text-red-400 text-center p-4`}>
          {temperatureTranslations[language].error}
        </div>
      )}
      {weather && (
        <section
          className={`flex justify-between rounded-3xl items-center shadow-md p-4 h-full ${
            isDarkMode ? "bg-[#292F45]" : "bg-[#E1E9EE]"
          }`}
        >
          <div className="flex flex-col gap-4">
            {/* Location Section */}
            <div
              className={`rounded-full gap-2 p-3 flex justify-center h-8 items-center w-fit ${
                isDarkMode ? "bg-[#3F4861]" : "bg-[#CDD9E0]"
              }`}
            >
              <IoLocation
                className={`${
                  isDarkMode ? "text-[#F3F4F7]" : "text-[#3D4852]"
                }`}
              />
              <h1
                className={`font-Inter font-normal text-[14px] ${
                  isDarkMode ? "text-[#F3F4F7]" : "text-[#3D4852]"
                }`}
              >
                {weather.name}
              </h1>
            </div>

            {/* Date Time Display */}
            <div className="flex flex-col">
              <DateTimeDisplay isDarkMode={isDarkMode} />
            </div>

            {/* Temperature Section */}
            <div>
              <h1
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
                }`}
              >
                {Math.round(weather.main.temp)}°C
              </h1>
              <span
                className={`text-sm font-normal font-roboto flex gap-2 ${
                  isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
                }`}
              >
                {temperatureTranslations[language].high}:{" "}
                {Math.round(weather.main.temp_max)}°
                <span>
                  {temperatureTranslations[language].low}:{" "}
                  {Math.round(weather.main.temp_min)}°
                </span>
              </span>
            </div>
          </div>

          {/* Weather Icon and Description Section */}
          <div className="flex flex-col items-center gap-2">
            <WeatherImageSelector description={weather.weather[0].description} />
            <h1
              className={`text-lg font-normal capitalize max-w-[150px] text-center ${
                isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
              }`}
            >
              {truncateDescription(
                getTranslatedDescription(weather.weather[0].description)
              )}
            </h1>
            <h2
              className={`text-sm font-roboto font-normal ${
                isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
              }`}
            >
              {temperatureTranslations[language].feelsLike}{" "}
              {Math.round(weather.main.feels_like)}°
            </h2>
          </div>
        </section>
      )}
    </div>
  );
};

export default CurrentTemperature;