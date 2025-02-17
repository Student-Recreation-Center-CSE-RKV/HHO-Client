import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ size = 40, color = "primary" }) => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      width={size} 
      height={size}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default LoadingSpinner;
