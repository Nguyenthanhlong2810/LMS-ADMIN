import { SkillsAPI } from 'apis/Skills';
import { HTTP_STATUS } from 'consts';
import React, { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import { Autocomplete, TextField } from '@mui/material';

export default function SkillPicker({
  value,
  onChange,
  error,
  helperText,
  placeholder,
  disabled,
  multiple = false
}) {
  const [skills, setSkills] = useState([]);

  const onSearchSkills = async (name) => {
    if (!name?.length) {
      return setSkills([]);
    }
    try {
      const res = await SkillsAPI.getByName(name);
      if (res.status === HTTP_STATUS.StatusOK) {
        setSkills(res.data?.map((c) => c.name) || []);
      }
    } catch (error) {
      setSkills([]);
    }
  };
  const debounceSearchSkill = _debounce(onSearchSkills, 200);
  const onChangeSkillInput = (e) => {
    debounceSearchSkill(e.target.value);
  };

  return (
    <Autocomplete
      multiple={multiple}
      value={value}
      options={skills}
      onChange={(_, val) => onChange(val)}
      placeholder="Chọn hoặc nhập"
      id="free-solo-dialog-demo"
      selectOnFocus
      clearOnBlur
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          onChange={onChangeSkillInput}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
