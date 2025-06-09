import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

interface SelectCityProps {
  city: string;
  setCity: (city: string) => void;
}

const SelectCity: React.FC<SelectCityProps> = ({ city, setCity }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
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
    "Barcelona"
  ];

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 295 }} size="small">
        <InputLabel id="demo-simple-select-label">
          Select Your Location
        </InputLabel>
        <Select
          id="demo-simple-select"
          value={city}
          label="Select Your Location"
          onChange={handleChange}
        >
          {cities.map((cityName) => (
            <MenuItem key={cityName} value={cityName}>
              {cityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectCity;