import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router';

import Filter from '@/components/filterSorterSearcher/filter/Filter';
import Searcher from '@/components/filterSorterSearcher/searcher/Searcher';
import Sorter from '@/components/filterSorterSearcher/sorter/Sorter';
import Title from '@/components/title/Title';

const Filters = () => {
  const navigate = useNavigate();

  return (
    <Accordion>
      <AccordionSummary>
        <Title
          alignSelf={'center'}
          textAlign={'center'}
          variant="caption"
          width={'100%'}
        >
          Filter options
        </Title>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container paddingBlock={2} spacing={1}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Filter />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Sorter />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Searcher />
          </Grid>
          <Grid
            component={Button}
            offset={{ sm: 3, md: 5, lg: 1 }}
            onClick={() => {
              navigate({ search: undefined, pathname: '/shop/all' });
            }}
            size={{ xs: 12, sm: 6, md: 2, lg: 2 }}
            variant="contained"
          >
            resetFilters
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Filters;
