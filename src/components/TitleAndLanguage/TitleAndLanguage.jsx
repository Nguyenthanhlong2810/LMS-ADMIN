import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title/Title';

export const TitleAndLanguage = ({ title, language, onChangeLanguage }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Title>{title} </Title>
      {/* <Box>
        <ToggleButtonGroup
          color="primary"
          value={language}
          exclusive
          onChange={onChangeLanguage}
          size="small">
          <ToggleButton value="vn">Tiếng Việt</ToggleButton>
          <ToggleButton value="en">Tiếng Anh</ToggleButton>
        </ToggleButtonGroup>
      </Box> */}
    </Box>
  );
};
TitleAndLanguage.propTypes = {
  onChangeLanguage: PropTypes.func,
  language: PropTypes.string,
  title: PropTypes.string
};
