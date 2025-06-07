import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 295 }} size="small">
        <InputLabel id="demo-simple-select-label">Select Your Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select Your Location"
          onChange={handleChange}
        >
          <MenuItem value={10}>Tehran</MenuItem>
          <MenuItem value={20}>-----</MenuItem>
          <MenuItem value={30}>------</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
