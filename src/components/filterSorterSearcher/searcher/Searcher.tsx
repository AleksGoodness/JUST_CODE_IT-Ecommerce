import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router';

import {} from '../../../services/api';
import Magnifier from '../../header/Magnifier/Magnifier';

const Searcher = () => {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (keyword: string) => {
    navigate({
      search: createSearchParams({
        fuzzy: 'true',
        markMatchingVariants: 'true',
        ['text.en-US']: keyword,
      }).toString(),
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        gap: 1,
        alignItems: 'center',
        flexGrow: '1',
      }}
    >
      <TextField
        label="Search"
        onChange={e => {
          setQuery(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch(query);
          }
        }}
        size="small"
        sx={{
          maxWidth: 'clamp(200px, 40%, 500px)',
          width: '100%',
        }}
        value={query}
        variant="outlined"
      />

      <IconButton
        onClick={() => handleSearch(query)}
        sx={{
          p: { xs: 0, sm: 1 },
          color: 'primary.main',
        }}
      >
        <Magnifier />
      </IconButton>
    </Box>
  );
};
export default Searcher;
