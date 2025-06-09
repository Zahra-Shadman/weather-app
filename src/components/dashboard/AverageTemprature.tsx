import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AverageTemperatureProps {
  city: string;
}

interface WeatherData {
  month: string;
  temperature: number;
}

interface CityCoordinates {
  [key: string]: {
    lat: number;
    lon: number;
  };
}

const AverageTemperature: React.FC<AverageTemperatureProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // مختصات شهرها
  const cityCoordinates: CityCoordinates = {
  Tehran: { lat: 35.6892, lon: 51.3890 },
  "New York": { lat: 40.7128, lon: -74.0060 },
  "Los Angeles": { lat: 34.0522, lon: -118.2437 },
  Chicago: { lat: 41.8781, lon: -87.6298 },
  Houston: { lat: 29.7604, lon: -95.3698 },
  Philadelphia: { lat: 39.9526, lon: -75.1652 },
  Phoenix: { lat: 33.4484, lon: -112.0740 },
  "San Antonio": { lat: 29.4241, lon: -98.4936 },
  "San Diego": { lat: 32.7157, lon: -117.1611 },
  Dallas: { lat: 32.7767, lon: -96.7970 },
  "San Francisco": { lat: 37.7749, lon: -122.4194 },
  London: { lat: 51.5074, lon: -0.1278 },
  Birmingham: { lat: 52.4862, lon: -1.8904 },
  Manchester: { lat: 53.4808, lon: -2.2426 },
  Glasgow: { lat: 55.8642, lon: -4.2518 },
  Liverpool: { lat: 53.4084, lon: -2.9916 },
  Leeds: { lat: 53.8008, lon: -1.5491 },
  Sheffield: { lat: 53.3811, lon: -1.4701 },
  Edinburgh: { lat: 55.9533, lon: -3.1883 },
  Bristol: { lat: 51.4545, lon: -2.5879 },
  Paris: { lat: 48.8566, lon: 2.3522 },
  Marseille: { lat: 43.2965, lon: 5.3698 },
  Lyon: { lat: 45.7640, lon: 4.8357 },
  Toulouse: { lat: 43.6047, lon: 1.4442 },
  Nice: { lat: 43.7102, lon: 7.2620 },
  Nantes: { lat: 47.2184, lon: -1.5536 },
  Strasbourg: { lat: 48.5734, lon: 7.7521 },
  Montpellier: { lat: 43.6108, lon: 3.8767 },
  Bordeaux: { lat: 44.8378, lon: -0.5792 },
  Berlin: { lat: 52.5200, lon: 13.4050 },
  Hamburg: { lat: 53.5511, lon: 9.9937 },
  Munich: { lat: 48.1351, lon: 11.5820 },
  Cologne: { lat: 50.9375, lon: 6.9603 },
  Frankfurt: { lat: 50.1109, lon: 8.6821 },
  Stuttgart: { lat: 48.7758, lon: 9.1829 },
  Dusseldorf: { lat: 51.2277, lon: 6.7735 },
  Dortmund: { lat: 51.5136, lon: 7.4653 },
  Essen: { lat: 51.4556, lon: 7.0116 },
  Rome: { lat: 41.9028, lon: 12.4964 },
  Milan: { lat: 45.4642, lon: 9.1900 },
  Naples: { lat: 40.8518, lon: 14.2681 },
  Turin: { lat: 45.0703, lon: 7.6869 },
  Palermo: { lat: 38.1157, lon: 13.3615 },
  Genoa: { lat: 44.4074, lon: 8.9338 },
  Bologna: { lat: 44.4949, lon: 11.3426 },
  Florence: { lat: 43.7696, lon: 11.2558 },
  Venice: { lat: 45.4408, lon: 12.3155 },
  Madrid: { lat: 40.4168, lon: -3.7038 },
  Barcelona: { lat: 41.3851, lon: 2.1734 }
};
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const coordinates = cityCoordinates[city];
      if (!coordinates) {
        throw new Error('City coordinates not found');
      }

      // دریافت داده‌های یک سال گذشته
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      const response = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.lat}&longitude=${coordinates.lon}&start_date=${startDateStr}&end_date=${endDateStr}&daily=temperature_2m_mean&timezone=auto`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      
      // محاسبه میانگین ماهیانه
      const monthlyData: { [key: number]: number[] } = {};
      
      data.daily.time.forEach((date: string, index: number) => {
        const month = new Date(date).getMonth();
        const temp = data.daily.temperature_2m_mean[index];
        
        if (!monthlyData[month]) {
          monthlyData[month] = [];
        }
        monthlyData[month].push(temp);
      });

      // محاسبه میانگین و تبدیل به فرمت مورد نیاز نمودار
      const chartData: WeatherData[] = monthNames.map((monthName, index) => {
        const temps = monthlyData[index] || [];
        const avgTemp = temps.length > 0 ? 
          Math.round(temps.reduce((sum, temp) => sum + temp, 0) / temps.length) : 0;
        
        return {
          month: monthName,
          temperature: avgTemp
        };
      });

      setWeatherData(chartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

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
          <LineChart data={weatherData} margin={{ top: 10, right: 30, left: 30, bottom: 20 }}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="1" y2="0">
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
              tick={{ fontSize: 11, fill: '#718096' }}
              axisLine={false}
              tickLine={false}
              dy={5}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#718096' }}
              axisLine={false}
              tickLine={false}
              dx={-5}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: 'rgba(0, 0, 0, 0.1)', strokeWidth: 1 }}
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
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
                stroke: '#fff', 
                strokeWidth: 3, 
                fill: '#6B73FF',
                filter: 'url(#glow)'
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