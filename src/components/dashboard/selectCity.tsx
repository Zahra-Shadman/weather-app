import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useLanguage } from "../../utils/loginTranslator";

interface SelectCityProps {
  city: string;
  setCity: (city: string) => void;
  isDarkMode: boolean; // پراپ isDarkMode برای کنترل رنگ متن
}

type CityTranslations = {
  [key: string]: string;
};

type Translations = {
  en: CityTranslations;
  fa: CityTranslations;
};

const SelectCity: React.FC<SelectCityProps> = ({ city, setCity, isDarkMode }) => {
  const { language, isRTL } = useLanguage();

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const cityTranslations: Translations = {
    en: {
      Tehran: "Tehran",
      "New York": "New York",
      "Los Angeles": "Los Angeles",
      Chicago: "Chicago",
      Houston: "Houston",
      Philadelphia: "Philadelphia",
      Phoenix: "Phoenix",
      "San Antonio": "San Antonio",
      "San Diego": "San Diego",
      Dallas: "Dallas",
      "San Francisco": "San Francisco",
      London: "London",
      Birmingham: "Birmingham",
      Manchester: "Manchester",
      Glasgow: "Glasgow",
      Liverpool: "Liverpool",
      Leeds: "Leeds",
      Sheffield: "Sheffield",
      Edinburgh: "Edinburgh",
      Bristol: "Bristol",
      Paris: "Paris",
      Marseille: "Marseille",
      Lyon: "Lyon",
      Toulouse: "Toulouse",
      Nice: "Nice",
      Nantes: "Nantes",
      Strasbourg: "Strasbourg",
      Montpellier: "Montpellier",
      Bordeaux: "Bordeaux",
      Berlin: "Berlin",
      Hamburg: "Hamburg",
      Munich: "Munich",
      Cologne: "Cologne",
      Frankfurt: "Frankfurt",
      Stuttgart: "Stuttgart",
      Dusseldorf: "Dusseldorf",
      Dortmund: "Dortmund",
      Essen: "Essen",
      Rome: "Rome",
      Milan: "Milan",
      Naples: "Naples",
      Turin: "Turin",
      Palermo: "Palermo",
      Genoa: "Genoa",
      Bologna: "Bologna",
      Florence: "Florence",
      Venice: "Venice",
      Madrid: "Madrid",
      Barcelona: "Barcelona",
    },
    fa: {
      Tehran: "تهران",
      "New York": "نیویورک",
      "Los Angeles": "لس آنجلس",
      Chicago: "شیکاگو",
      Houston: "هیوستون",
      Philadelphia: "فیلادلفیا",
      Phoenix: "فینیکس",
      "San Antonio": "سن آنتونیو",
      "San Diego": "سن دیگو",
      Dallas: "دالاس",
      "San Francisco": "سن فرانسیسکو",
      London: "لندن",
      Birmingham: "بیرمنگام",
      Manchester: "منچستر",
      Glasgow: "گلاسگو",
      Liverpool: "لیورپول",
      Leeds: "لیدز",
      Sheffield: "شفیلد",
      Edinburgh: "ادینبورگ",
      Bristol: "بریستول",
      Paris: "پاریس",
      Marseille: "مارسی",
      Lyon: "لیون",
      Toulouse: "تولوز",
      Nice: "نیس",
      Nantes: "نانت",
      Strasbourg: "استراسبورگ",
      Montpellier: "مونپلیه",
      Bordeaux: "بوردو",
      Berlin: "برلین",
      Hamburg: "هامبورگ",
      Munich: "مونیخ",
      Cologne: "کلن",
      Frankfurt: "فرانکفورت",
      Stuttgart: "اشتوتگارت",
      Dusseldorf: "دوسلدورف",
      Dortmund: "دورتموند",
      Essen: "اسن",
      Rome: "رم",
      Milan: "میلان",
      Naples: "ناپل",
      Turin: "تورین",
      Palermo: "پالرمو",
      Genoa: "جنوا",
      Bologna: "بولونیا",
      Florence: "فلورانس",
      Venice: "ونیز",
      Madrid: "مادرید",
      Barcelona: "بارسلونا",
    },
  };

  const componentTranslations = {
    en: {
      selectLocation: "Select Your Location",
    },
    fa: {
      selectLocation: "موقعیت خود را انتخاب کنید",
    },
  };

  const cities = [
    "Tehran",
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia",
    "Phoenix",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Francisco",
    "London",
    "Birmingham",
    "Manchester",
    "Glasgow",
    "Liverpool",
    "Leeds",
    "Sheffield",
    "Edinburgh",
    "Bristol",
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Montpellier",
    "Bordeaux",
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Dusseldorf",
    "Dortmund",
    "Essen",
    "Rome",
    "Milan",
    "Naples",
    "Turin",
    "Palermo",
    "Genoa",
    "Bologna",
    "Florence",
    "Venice",
    "Madrid",
    "Barcelona",
  ];

  const currentTranslations = componentTranslations[language];
  const currentCityTranslations = cityTranslations[language as keyof Translations];

  return (
    <Box dir={isRTL ? "rtl" : "ltr"}>
      <FormControl sx={{ m: 1, minWidth: 295 }} size="small">
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            right: isRTL ? 14 : "auto",
            left: isRTL ? "auto" : 14,
            transformOrigin: isRTL ? "top right" : "top left",
            color: isDarkMode ? "#FFFFFF" : "#000000", // سفید در دارک مود
          }}
        >
          {currentTranslations.selectLocation}
        </InputLabel>
        <Select
          id="demo-simple-select"
          value={city}
          label={currentTranslations.selectLocation}
          onChange={handleChange}
          sx={{
            "& .MuiSelect-select": {
              textAlign: isRTL ? "right" : "left",
              color: isDarkMode ? "#FFFFFF" : "#000000", // سفید در دارک مود
            },
            "& .MuiOutlinedInput-notchedOutline": {
              textAlign: isRTL ? "right" : "left",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                direction: isRTL ? "rtl" : "ltr",
                "& .MuiMenuItem-root": {
                  justifyContent: isRTL ? "flex-end" : "flex-start",
                  color: isDarkMode ? "#FFFFFF" : "#000000", // سفید در دارک مود
                },
              },
            },
          }}
        >
          {cities.map((cityName) => (
            <MenuItem
              key={cityName}
              value={cityName}
              sx={{
                justifyContent: isRTL ? "flex-end" : "flex-start",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {currentCityTranslations[cityName] || cityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectCity;