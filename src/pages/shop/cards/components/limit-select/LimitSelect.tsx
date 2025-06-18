import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const LimitSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [limit, setLimit] = useState(4);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('limit', newLimit.toString());
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const oldLimit = searchParams.get('limit');
    const parsedLimit = oldLimit ? parseInt(oldLimit) : 4;

    if (!isNaN(parsedLimit)) {
      setLimit(parsedLimit);
    }
  }, [location.search]);

  return (
    <FormControl size="small" sx={{ minWidth: '5rem' }}>
      <InputLabel id="limit-select-label">Limit</InputLabel>
      <Select
        id="limit-select"
        label="Limit"
        labelId="limit-select-label"
        onChange={handleChange}
        value={limit}
      >
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={12}>12</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LimitSelect;
