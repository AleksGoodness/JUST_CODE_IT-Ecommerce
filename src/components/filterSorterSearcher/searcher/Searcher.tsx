import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import Magnifier from '../../header/Magnifier/Magnifier';
import SearchProductsRequest from '../searchProductsRequest';

const Searcher = () => {
  const [query, setQuery] = useState('');
  const handleSearch = async (keyword: string) => {
    console.log('Search for:', query);
    await SearchProductsRequest(keyword);
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
