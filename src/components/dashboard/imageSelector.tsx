import React from "react";

interface WeatherImageSelectorProps {
  description: string;
}

const WeatherImageSelector: React.FC<WeatherImageSelectorProps> = ({ description }) => {
  const getWeatherImage = (desc: string) => {
    const lowerDesc = desc.toLowerCase();
    if (lowerDesc.includes("rain")) return "./WeekForecastImages/Rain cloud.svg";
    if (lowerDesc.includes("storm")) return "./WeekForecastImages/storm.svg";
    if (lowerDesc.includes("cloud")) return "./WeekForecastImages/sun cloudy.svg";
    if (lowerDesc.includes("clear sky") || lowerDesc.includes("sunny")) return "./WeekForecastImages/suny.svg";
    return "./WeekForecastImages/Rain cloud.svg"; 
  };

  return (
    <img
      className="w-38 h-24"
      src={getWeatherImage(description)}
      alt="weather icon"
    />
  );
};

export default WeatherImageSelector;