import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: '100%' }} 
    >
      <TextField
        id="outlined-basic"
        label="Enter Your Username"
        variant="outlined"
        fullWidth 
      />
    </Box>
  );
}