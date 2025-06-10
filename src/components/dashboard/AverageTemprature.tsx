import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

interface IAverageTemperatureProps {
  city: string;
}

interface IWeatherData {
  month: string;
  temperature: number;
}

interface ICityCoordinates {
  [key: string]: {
    latitude: number;
    longitude: number;
  };
}

const AverageTemperature: React.FC<IAverageTemperatureProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cityCoordinates, setCityCoordinates] = useState<ICityCoordinates>({});

  const monthNames = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const fetchCityCoordinates = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fa`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch city coordinates");
      }

      const data = response.data;

      if (data.results && data.results.length > 0) {
        setCityCoordinates({
          [city]: {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
          },
        });
      } else {
        setError("City not found");
      }
    } catch (error: any) {
      setError(
        error.message || "An error occurred while fetching city coordinates"
      );
    }
  }, [city]);

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!city) {
        throw new Error("City is required");
      }

      if (!cityCoordinates[city]) {
        await fetchCityCoordinates();
      }

      const coordinates = cityCoordinates[city];

      if (!coordinates) {
        throw new Error("City coordinates not found");
      }

      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);

      const startDateStr = startDate.toISOString().split("T")[0];
      const endDateStr = endDate.toISOString().split("T")[0];

      const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&start_date=${startDateStr}&end_date=${endDateStr}&daily=temperature_2m_mean&timezone=auto`;

      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        throw new Error("Failed to fetch weather data");
      }

      const data = response.data;

      const monthlyData: { [key: number]: number[] } = {};

      data.daily.time.forEach((date: string, index: number) => {
        const month = new Date(date).getMonth();
        const temp = data.daily.temperature_2m_mean[index];

        if (!monthlyData[month]) {
          monthlyData[month] = [];
        }
        monthlyData[month].push(temp);
      });

      const chartData: IWeatherData[] = monthNames.map((monthName, index) => {
        const temps = monthlyData[index] || [];
        const avgTemp =
          temps.length > 0
            ? Math.round(
                temps.reduce((sum, temp) => sum + temp, 0) / temps.length
              )
            : 0;

        return {
          month: monthName,
          temperature: avgTemp,
        };
      });

      setWeatherData(chartData);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [city, cityCoordinates, monthNames, fetchCityCoordinates]);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, fetchWeatherData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 border border-white/20 rounded-xl shadow-xl">
          <p className="font-semibold text-gray-700">{`${label}`}</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#9F7AEA] font-bold">
            {`${payload[0].value}°C`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-[740px] h-[234px] bg-[#E1E9EE] rounded-3xl shadow-md flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[740px] h-[234px] bg-[#E1E9EE] rounded-3xl shadow-md flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error Loading Data</p>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[740px] h-[234px] bg-gradient-to-br from-[#E8F4FD] to-[#D1E7F7] rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-left mb-4 text-[#4A5568]">
        Average Monthly Temperature
      </h2>
      <div className="h-[170px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={weatherData}
            margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="temperatureGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="30%" stopColor="#0099FF" />
                <stop offset="60%" stopColor="#6B73FF" />
                <stop offset="100%" stopColor="#9F7AEA" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0, 212, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(159, 122, 234, 0.1)" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="2 2"
              stroke="rgba(0, 0, 0, 0.1)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#718096" }}
              axisLine={false}
              tickLine={false}
              dy={5}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#718096" }}
              axisLine={false}
              tickLine={false}
              dx={-5}
              domain={["dataMin - 5", "dataMax + 5"]}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(0, 0, 0, 0.1)", strokeWidth: 1 }}
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="url(#temperatureGradient)"
              strokeWidth={4}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#fff",
                strokeWidth: 3,
                fill: "#6B73FF",
                filter: "url(#glow)",
              }}
              filter="url(#glow)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AverageTemperature;
