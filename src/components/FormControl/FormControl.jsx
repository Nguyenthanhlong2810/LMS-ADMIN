import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

FormControl.propTypes = {
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  titleWidth: PropTypes.string,
  titleAlign: PropTypes.string
};

export function FormControl({
  label,
  required,
  children,
  padding = 2,
  titleWidth,
  width = '100%',
  disabled = false,
  ...props
}) {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column', padding: padding, gap: 1, width, ...props }}>
      <Typography
        sx={{
          textTransform: 'capitalize',
          fontWeight: 500,
          color: disabled ? '#ccc' : 'normal',
          width: titleWidth
        }}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </Typography>
      {children}
    </Box>
  );
}
