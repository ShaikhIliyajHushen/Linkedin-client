import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const Loader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'150px',
      }}
    >
      <Typography variant="h5" component="h5">
        Linkedin
      </Typography>
      <Box sx={{ width: '15%', mt: 2 }}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default Loader;
