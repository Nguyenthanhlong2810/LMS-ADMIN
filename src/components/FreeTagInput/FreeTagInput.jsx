import { Autocomplete, TextField } from '@mui/material';
import './FreeTagInput.scss';
import React from 'react';

export function FreeTagInput({
  value,
  onChange,
  label,
  maxLength,
  options = [],
  defaultValue,
  keyName,
  onChangeInput,
  disabled,
  ...textProps
}) {
  function handleChange(_, value) {
    if (maxLength && value.length > maxLength) {
      return;
    }
    if (onChange) {
      const formatValue = value.reduce((prev, cur) => {
        if (typeof cur === 'string') {
          const trimValue = cur?.trim();
          if (trimValue && !prev.includes(trimValue)) {
            return [...prev, cur.trim()];
          }
        } else {
          const trimValue = cur[keyName]?.trim();
          if (trimValue && !prev.includes(trimValue)) {
            return [...prev, trimValue];
          }
        }

        return prev;
      }, []);
      onChange(formatValue);
    }
  }
  return (
    <Autocomplete
      multiple
      value={value}
      onChange={handleChange}
      defaultValue={defaultValue}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }

        return keyName ? option[keyName] : option.name;
      }}
      options={options}
      ChipProps={{
        sx: {
          maxWidth: '300px'
        },
        className: 'chip-custom'
      }}
      selectOnFocus
      clearOnBlur
      freeSolo
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          className="tag-input-wrapper"
          {...params}
          label={label}
          {...textProps}
          onChange={onChangeInput}
        />
      )}
    />
  );
}
