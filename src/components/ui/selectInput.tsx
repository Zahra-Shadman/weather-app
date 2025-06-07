import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useLanguage } from '../../utils/loginTranslator';
import type { Language } from '../../types/Language';

export default function SelectVariants() {
  const { language, setLanguage, translations } = useLanguage();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          {translations.language}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={language}
          onChange={handleChange}
          label={translations.language}
        >
          <MenuItem value={'en'}>{translations.english}</MenuItem>
          <MenuItem value={'fa'}>{translations.farsi}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}