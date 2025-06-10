import { useState } from "react";
import WeatherImageSelector from "./imageSelector";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import WeeklyDataFetcher from "./weeklyFetcher";
import { useLanguage } from "../../utils/loginTranslator";

interface IWeatherItem {
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

interface IWeeklyWeatherData {
  list: IWeatherItem[];
  city: {
    name: string;
  };
}

interface IWeekForecastProps {
  city: string;
  isDarkMode: boolean;
}

interface IDailyForecast {
  date: string;
  dayName: string;
  temp: number;
  description: string;
  icon: string;
}

export default function WeekForecast({ city, isDarkMode }: IWeekForecastProps) {
  const [weeklyWeather, setWeeklyWeather] = useState<IWeeklyWeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { language, isRTL } = useLanguage();

  const translations = {
    en: {
      title: "2 Weeks Forecast",
      error: "Failed to fetch weather data",
      loading: "Loading...",
      noCity: "Please select a city",
    },
    fa: {
      title: "پیش‌بینی دو هفته‌ای",
      error: "دریافت اطلاعات آب‌وهوا ناموفق بود",
      loading: "در حال بارگذاری...",
      noCity: "لطفاً یک شهر انتخاب کنید",
    },
  };

  interface Translation {
    [key: string]: string;
  }

  const weatherDescriptionTranslations: {
    en: Translation;
    fa: Translation;
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
      "overcast clouds": "Overcast Clouds",
      "moderate rain": "Moderate Rain",
      "light rain": "Light Rain",
      haze: "Haze",
    },
    fa: {
      "clear sky": "آسمان صاف",
      "few clouds": "کمی ابری",
      "scattered clouds": "ابرهای پراکنده",
      "broken clouds": "ابرهای شکسته",
      "shower rain": "باران رگباری",
      rain: "باران",
      thunderstorm: "رعد و برق",
      snow: "برف",
      mist: "مه",
      "overcast clouds": "پوشیده از ابر",
      "moderate rain": "باران معمولی",
      "light rain": "باران ملایم",
      haze: "مه",
    },
  };




  const dayNamesTranslations: {
    en: Translation;
    fa: Translation;
  } = {
    en: {
      Sunday: "Sunday",
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Today: "Today",
    },
    fa: {
      Sunday: "یک‌شنبه",
      Monday: "دوشنبه",
      Tuesday: "سه‌شنبه",
      Wednesday: "چهارشنبه",
      Thursday: "پنج‌شنبه",
      Friday: "جمعه",
      Saturday: "شنبه",
      Today: "امروز",
    },
  };

  const getTranslatedDescription = (description: string): string => {
    return weatherDescriptionTranslations[language][description.toLowerCase()] || description;
  };

 

  const getTranslatedDayName = (dayName: string): string => {
    return dayNamesTranslations[language][dayName] || dayName;
  };

  const processDailyData = (data: IWeeklyWeatherData): IDailyForecast[] => {
    const dailyData: { [key: string]: IWeatherItem[] } = {};

    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    return Object.keys(dailyData)
      .slice(0, 5)
      .map((date) => {
        const dayItems = dailyData[date];
        const midDayItem = dayItems[Math.floor(dayItems.length / 2)];

        const dateObj = new Date(date);
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayName =
          dateObj.getDay() === new Date().getDay()
            ? "Today"
            : dayNames[dateObj.getDay()];

        return {
          date,
          dayName: getTranslatedDayName(dayName),
          temp: Math.round(midDayItem.main.temp),
          description: getTranslatedDescription(midDayItem.weather[0].description),
          icon: midDayItem.weather[0].icon,
        };
      });
  };

  const dailyForecasts = weeklyWeather ? processDailyData(weeklyWeather) : [];

  return (
    <div className="relative" dir={isRTL ? "rtl" : "ltr"}>
      <WeeklyDataFetcher
        city={city}
        onDataFetched={setWeeklyWeather}
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
          {translations[language].error}
        </div>
      )}

      <div
        className={`w-[1264px] ml-1 h-[350px] p-6 rounded-3xl shadow-md ${
          isDarkMode ? "bg-[#292F45]" : "bg-[#E1E9EE]"
        }`}
      >
        <h2
          className={`text-2xl font-Inter font-semibold ${
            isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
          }`}
        >
          {translations[language].title}
        </h2>

        <div className={`flex justify-between items-center h-full ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
          {dailyForecasts.length > 0 ? (
            dailyForecasts.map((forecast, index) => (
              <div
                key={index}
                className={`w-40 h-64 rounded-3xl flex flex-col items-center justify-center gap-3 p-4 ${
                  isDarkMode
                    ? "bg-[#3F4861] text-[#F3F4F7]"
                    : "bg-[#CDD9E0] text-[#003464]"
                }`}
              >
                <p className="text-sm font-medium text-center">
                  {forecast.dayName}
                </p>
                <span
                  className={`w-full border-t ${
                    isDarkMode ? "border-[#F3F4F7]" : "border-[#003464]"
                  } opacity-30`}
                ></span>
                <div className="flex justify-center">
                  <WeatherImageSelector description={forecast.description} />
                </div>
                <p className="text-lg font-semibold">{forecast.temp}°C</p>
                <p className="text-xs text-center capitalize opacity-75">
                  {forecast.description}
                </p>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              <p
                className={`text-lg ${
                  isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
                }`}
              >
                {loading ? translations[language].loading : translations[language].noCity}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}