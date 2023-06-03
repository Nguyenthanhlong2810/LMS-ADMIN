import { FormControl, FormHelperText, Select } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export const InputSelect = ({ name, control, errorMes, children, ...selectProps }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormControl error={!!errorMes}>
          <Select {...field} value={field.value || ''} {...selectProps}>
            {children}
          </Select>
          <FormHelperText>{errorMes}</FormHelperText>
        </FormControl>
      )}
      control={control}
    />
  );
};
