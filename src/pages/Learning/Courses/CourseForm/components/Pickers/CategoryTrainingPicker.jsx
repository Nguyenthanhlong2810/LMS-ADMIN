import { Autocomplete, TextField } from '@mui/material';
import { CategoryTrainingAPI } from 'apis/CategoryTraining';
import React, { useState } from 'react';
import { useEffect } from 'react';

export default function CategoryTrainingPicker({
  value,
  onChange,
  error,
  helperText,
  site: language = 'vn',
  placeholder,
  disabled
}) {
  const [categories, setCategories] = useState([]);

  const onSearchCategory = async () => {
    try {
      const { data } = await CategoryTrainingAPI.getList({
        pageSize: 50,
        pageNo: 1,
        language
      });
      setCategories((data || []).map((c) => c.name));
    } catch (error) {
      setCategories([]);
    }
  };

  useEffect(() => {
    onSearchCategory();
  }, []);

  return (
    <Autocomplete
      options={categories}
      value={value}
      onChange={(_, val) => onChange(val)}
      selectOnFocus
      clearOnBlur
      disabled={disabled}
      placeholder={placeholder}
      renderInput={(params) => (
        <TextField {...params} error={error} helperText={helperText} placeholder={placeholder} />
      )}
    />
  );
}
