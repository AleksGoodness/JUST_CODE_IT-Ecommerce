import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router';

const Sorter = () => {
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value);
    console.log(sortOption);
    navigate({
      search: createSearchParams({
        sort: sortOption,
        markMatchingVariants: 'true',
      }).toString(),
    });
  };

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: '10rem',
      }}
    >
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select
        label="Sort"
        labelId="sort-label"
        onChange={handleChange}
        value={sortOption}
      >
        <MenuItem value="name+asc">Name: A → z</MenuItem>
        <MenuItem value="name+desc">Name: Z → a</MenuItem>
        <MenuItem value="price+asc">Price: Up</MenuItem>
        <MenuItem value="price+desc">Price: Down</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sorter;
