import { Box } from '@mui/material';

import Filter from './filter/Filter';
import Searcher from './searcher/Searcher';
import Sorter from './sorter/Sorter';

const Filters = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        mt: '4.5rem',
        gap: '0.5rem',
      }}
    >
      <Box sx={{ gap: '1rem', display: 'flex' }}>
        <Filter />
        <Sorter />
      </Box>

      <Searcher />
    </Box>
  );
};
export default Filters;
