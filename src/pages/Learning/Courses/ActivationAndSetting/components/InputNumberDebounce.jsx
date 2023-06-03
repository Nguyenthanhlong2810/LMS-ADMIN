import { InputAdornment } from '@mui/material';
import { InputNumber } from 'components';
import { debounce } from 'lodash';
import React, { useState } from 'react';

export default function InputNumberDebounce({ value, onChange, disabled = false }) {
  const [input, setInput] = useState(value);
  const debounceOnChange = debounce((inputValue) => {
    onChange(inputValue);
  }, 200);
  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    setInput(inputValue);
    debounceOnChange(inputValue);
  };

  return (
    <InputNumber
      disabled={disabled}
      size="small"
      sx={{ width: 80, background: disabled ? '#f3f2f2' : 'normal' }}
      inputProps={{
        max: 100
      }}
      InputProps={{ inputProps: { min: 0 } }}
      value={input}
      onChange={handleChange}
      endAdornment={<InputAdornment position="end">%</InputAdornment>}
    />
  );
}
