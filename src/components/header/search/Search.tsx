import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import Magnifier from '../Magnifier/Magnifier';

const Search = () => {
  const [query, setQuery] = useState('');
  const handleSearch = async () => {
    console.log('Search for:', query);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        gap: 1,
        pt: '4rem',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        label="Search"
        onChange={e => {
          setQuery(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        sx={{
          maxWidth: 'clamp(200px, 60%, 350px)',
        }}
        value={query}
        variant="outlined"
      />

      <IconButton
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
export default Search;
