import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'background.paper',
        opacity: 0.6,
        zIndex: 100,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
