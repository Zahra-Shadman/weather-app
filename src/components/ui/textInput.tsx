import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { IUsernameInputProps } from '../../types/UsernameInputProps';


export default function UsernameInput({ value, onChange }: IUsernameInputProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        id="outlined-basic"
        label="Enter Your Username"
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}