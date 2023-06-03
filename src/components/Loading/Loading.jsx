import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = ({ loading = false }) => (
  <Backdrop sx={{ color: '#1FBDF8', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loading;
