import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
const Filter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [priceRange, setPriceRange] = useState<number[]>([50, 200]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const debouncedApplyFilters = useDebounceCallback((range: number[]) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(
      'filter',
      `variants.prices.value.centAmount:range (${range[0] * 100} to ${range[1] * 100})`,
    );
    searchParams.set('markMatchingVariants', 'true');

    navigate({ search: searchParams.toString() });
  }, 500);

  const handleChange = (newValue: number[]) => {
    setPriceRange(newValue);
    debouncedApplyFilters(newValue);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Filter
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
        open={open}
      >
        <Box sx={{ p: 2, width: '16rem' }}>
          <Typography gutterBottom>Price range (BYN)</Typography>
          <Slider
            max={200}
            min={50}
            onChange={(_, newValue) => handleChange(newValue as number[])}
            value={priceRange}
            valueLabelDisplay="auto"
          />
        </Box>
      </Popover>
    </>
  );
};

export default Filter;
