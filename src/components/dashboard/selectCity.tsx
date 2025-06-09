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
          <MenuItem value={"Tehran"}>Tehran</MenuItem>
          <MenuItem value={"New York"}>New York</MenuItem>
          <MenuItem value={"Paris"}>Paris</MenuItem>
          <MenuItem value={"Tokyo"}>Tokyo</MenuItem>
          <MenuItem value={"London"}>London</MenuItem>
          <MenuItem value={"Rome"}>Rome</MenuItem>
          <MenuItem value={"Berlin"}>Berlin</MenuItem>
          <MenuItem value={"Dubai"}>Dubai</MenuItem>
          <MenuItem value={"Barcelona"}>Barcelona</MenuItem>
          <MenuItem value={"Sydney"}>Sydney</MenuItem>
          <MenuItem value={"Istanbul"}>Istanbul</MenuItem>
          <MenuItem value={"Los Angeles"}>Los Angeles</MenuItem>
          <MenuItem value={"Bangkok"}>Bangkok</MenuItem>
          <MenuItem value={"San Francisco"}>San Francisco</MenuItem>
          <MenuItem value={"Toronto"}>Toronto</MenuItem>
          <MenuItem value={"Moscow"}>Moscow</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectCity;
