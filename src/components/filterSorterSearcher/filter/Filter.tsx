import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const Filter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [heightRange, setHeightRange] = useState<number[]>([0, 300]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            max={1000}
            min={0}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            value={priceRange}
            valueLabelDisplay="auto"
          />
          <Typography gutterBottom sx={{ mt: 2 }}>
            Height (cm)
          </Typography>
          <Slider
            max={150}
            min={0}
            onChange={(_, newValue) => setHeightRange(newValue as number[])}
            value={heightRange}
            valueLabelDisplay="auto"
          />
        </Box>
      </Popover>
    </>
  );
};

export default Filter;
