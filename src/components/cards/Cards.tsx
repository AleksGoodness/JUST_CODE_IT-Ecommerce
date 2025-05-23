import { Box, CircularProgress, Typography } from '@mui/material';
import { NavLink, useParams } from 'react-router';

const Cards = () => {
  const { category } = useParams();

  if (!category) {
    return <Typography>Please choose category</Typography>;
  }

  return (
    <Box
      columnGap="1rem"
      display="grid"
      sx={{
        border: '3px solid red',
        p: 4,
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      <Typography variant="sectionTitle">{category}</Typography>
      <Box component={NavLink} to={'big/14cc22b8-9585-480e-ae2e-2a982f90272b'}>
        <CircularProgress />
        <Typography>name: Big</Typography>
        <Typography>price: 100</Typography>
      </Box>
      <Box component={NavLink} to={'small'}>
        <CircularProgress />
        <Typography>name: small</Typography>
        <Typography>price: 10</Typography>
      </Box>
      <Box component={NavLink} to={'large'}>
        <CircularProgress />
        <Typography>name: large</Typography>
        <Typography>price: 1001</Typography>
      </Box>
      <Box
        component={NavLink}
        to={'medium/14cc22b8-9585-480e-ae2e-2a982f90272b'}
      >
        <CircularProgress />
        <Typography>name: medium</Typography>
        <Typography>price: 1020</Typography>
      </Box>
      <Box component={NavLink} to={'regular'}>
        <CircularProgress />
        <Typography>name: regular</Typography>
        <Typography>price: 1200</Typography>
      </Box>
    </Box>
  );
};

export default Cards;
