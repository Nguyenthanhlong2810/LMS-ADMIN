import { Button, Grid } from '@mui/material';
import React from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';

export const GroupButtonSearch = ({ handleReset }) => {
  return (
    <>
      <Grid item />
      <Grid item>
        <Button className="icon-btn" variant="contained" color="secondary" type="submit">
          <SearchIcon />
        </Button>
        <Button
          className="icon-btn"
          variant="contained"
          sx={{ backgroundColor: '#A9A9A9', marginLeft: 1.5 }}
          onClick={handleReset}>
          <CachedIcon />
        </Button>
      </Grid>
      <Grid item />
    </>
  );
};
