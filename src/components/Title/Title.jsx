import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Title({ children, className }) {
  return (
    <Box
      sx={{
        paddingY: 3
      }}
      className={className}>
      <Typography textTransform="uppercase" fontWeight="bold">
        {children}
      </Typography>
    </Box>
  );
}
