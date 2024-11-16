import React from 'react';
import { Box } from '@mui/material';

const ScrollableContainer = ({ children }) => {
  return (
    <Box
      sx={{
        overflowY: 'auto',
        maxHeight: '90vh', 
        width: '100%', 
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '10px',
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollableContainer;