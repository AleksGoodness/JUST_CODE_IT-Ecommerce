import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

const Sorter = () => {
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let initialSortOption = searchParams.get('sort') || '';
    initialSortOption = initialSortOption.split(' ').join('-');

    if (initialSortOption !== sortOption) setSortOption(initialSortOption);
  }, [sortOption, location.search]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setSortOption(newValue);
    const searchParams = new URLSearchParams(location.search);

    if (newValue === 'price-desc') {
      searchParams.set('sort', 'price desc');
    } else if (newValue === 'price-asc') {
      searchParams.set('sort', 'price asc');
    } else {
      searchParams.set('sort', newValue); // для name asc/desc
    }

    searchParams.set('markMatchingVariants', 'true');

    navigate({ search: searchParams.toString() });
  };
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select
        label="Sort"
        labelId="sort-label"
        onChange={handleChange}
        value={sortOption}
      >
        <MenuItem value="price-asc">Price: Up</MenuItem>
        <MenuItem value="price-desc">Price: Down</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sorter;
