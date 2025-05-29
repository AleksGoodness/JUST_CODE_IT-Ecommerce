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
        // border: '3px solid red',
        p: 4,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
      }}
    >
      <Typography variant="sectionTitle">{category}</Typography>
      <Box component={NavLink} to={'big/d6c49fd9-1058-4e50-9040-7cfa9bac5635'}>
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
        to={'medium/d6c49fd9-1058-4e50-9040-7cfa9bac5635'}
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
