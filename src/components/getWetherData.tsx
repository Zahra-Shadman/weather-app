import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

// تعریف نوع برای داده‌های API
interface Forecast {
  dt: number;
  main: {
    temp: number;
  };
}

interface WeatherData {
  cod: string;
  message?: string;
  list: Forecast[];
}

const WeatherChart: React.FC = () => {
  const [temps, setTemps] = useState<number[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // تنظیمات API
  const API_KEY = 'af6bc152abc4d156f76123808f36e39f'; // کلید API خود را اینجا قرار دهید
  const CITY = 'Tehran';
  const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(URL);
        const data = response.data;

        if (data.cod !== '200') {
          setError(data.message || 'خطا در دریافت داده');
          return;
        }

        // استخراج دما و زمان
        const tempData = data.list.map((forecast) => forecast.main.temp);
        const timeData = data.list.map((forecast) =>
          new Date(forecast.dt * 1000).toLocaleString('fa-IR', {
            dateStyle: 'short',
            timeStyle: 'short',
          })
        );

        setTemps(tempData);
        setTimes(timeData);
      } catch (err) {
        setError('خطا در اتصال به API');
      }
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', color: 'error.main' }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (!temps.length) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">در حال بارگذاری...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        نوسان دمای شهر {CITY} در ۵ روز آینده
      </Typography>
      <LineChart
        xAxis={[{ data: times, label: 'زمان', scaleType: 'point' }]}
        yAxis={[{ label: 'دما (سلسیوس)' }]}
        series={[{ data: temps, label: `دمای شهر ${CITY}`, color: '#1976d2' }]}
        height={400}
        grid={{ vertical: true, horizontal: true }}
        sx={{
          '& .MuiChartsAxis-tickLabel': {
            fontFamily: 'Vazir, Arial, sans-serif', // برای پشتیبانی از فونت فارسی
          },
          '& .MuiChartsAxis-label': {
            fontFamily: 'Vazir, Arial, sans-serif',
          },
        }}
      />
    </Box>
  );
};

export default WeatherChart;