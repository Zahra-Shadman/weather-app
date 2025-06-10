import React from "react";
import { useLanguage } from "../../utils/loginTranslator";

interface WeatherImageSelectorProps {
  description: string;
}

const WeatherImageSelector: React.FC<WeatherImageSelectorProps> = ({
  description,
}) => {
  const { language } = useLanguage();

  interface WeatherImageMap {
    [key: string]: string;
  }

  const weatherImageMap: {
    en: WeatherImageMap;
    fa: WeatherImageMap;
  } = {
    en: {
      "clear sky": "./WeekForecastImages/suny.svg",
      sunny: "./WeekForecastImages/suny.svg",
      "few clouds": "./WeekForecastImages/sun cloudy.svg",
      "scattered clouds": "./WeekForecastImages/sun cloudy.svg",
      "broken clouds": "./WeekForecastImages/sun cloudy.svg",
      "overcast clouds": "./WeekForecastImages/sun cloudy.svg",
      rain: "./WeekForecastImages/Rain cloud.svg",
      "shower rain": "./WeekForecastImages/Rain cloud.svg",
      "light rain": "./WeekForecastImages/Rain cloud.svg",
      "moderate rain": "./WeekForecastImages/Rain cloud.svg",
      thunderstorm: "./WeekForecastImages/storm.svg",
      snow: "./WeekForecastImages/snow.svg",
      mist: "./WeekForecastImages/mist.svg",
      haze: "./WeekForecastImages/mist.svg",
    },
    fa: {
      "آسمان صاف": "./WeekForecastImages/suny.svg",
      "کمی ابری": "./WeekForecastImages/sun cloudy.svg",
      "ابرهای پراکنده": "./WeekForecastImages/sun cloudy.svg",
      "ابرهای شکسته": "./WeekForecastImages/sun cloudy.svg",
      "پوشیده از ابر": "./WeekForecastImages/sun cloudy.svg",
      باران: "./WeekForecastImages/Rain cloud.svg",
      "باران رگباری": "./WeekForecastImages/Rain cloud.svg",
      "باران ملایم": "./WeekForecastImages/Rain cloud.svg",
      "باران معمولی": "./WeekForecastImages/Rain cloud.svg",
      "رعد و برق": "./WeekForecastImages/storm.svg",
      برف: "./WeekForecastImages/snow.svg",
      مه: "./WeekForecastImages/mist.svg",
    },
  };

  const getWeatherImage = (desc: string): string => {
    const lowerDesc = desc.toLowerCase();
    return (
      weatherImageMap[language][lowerDesc] ||
      "./WeekForecastImages/Rain cloud.svg"
    );
  };

  return (
    <img
      className="w-32 h-24"
      src={getWeatherImage(description)}
      alt="weather icon"
    />
  );
};

export default WeatherImageSelector;
