import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import {} from '../../../services/api';
import Magnifier from '../../header/Magnifier/Magnifier';

const Searcher = () => {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (keyword: string) => {
    const currentSearch = new URLSearchParams(location.search);

    if (keyword) {
      currentSearch.set('text.en-US', keyword);
      currentSearch.set('fuzzy', 'true');
      currentSearch.set('markMatchingVariants', 'true');
    } else {
      currentSearch.delete('text.en-US');
      currentSearch.delete('fuzzy');
    }
    navigate({ search: currentSearch.toString() });
  };

  return (
    <Grid container>
      <TextField
        onChange={e => {
          setQuery(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch(query);
          }
        }}
        size="small"
        sx={{ flexGrow: 1 }}
        value={query}
        variant="outlined"
      />

      <IconButton
        onClick={() => handleSearch(query)}
        sx={{
          color: 'primary.main',
        }}
      >
        <Magnifier />
      </IconButton>
    </Grid>
  );
};
export default Searcher;
