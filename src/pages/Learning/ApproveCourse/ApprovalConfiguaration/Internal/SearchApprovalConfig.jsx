import React from 'react';

import { Grid, TextField, Select, MenuItem } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { PROGRAM_TYPE } from 'consts';
const SearchApprovalConfig = ({ setSearchParams }) => {
  const defaultValues = { type: 'all', name: '' };
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: defaultValues
  });

  function handleSearch(values) {
    setSearchParams({ ...formatReq(values) });
  }

  function handleReset() {
    reset();
    setSearchParams({ ...formatReq(defaultValues) });
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}>
        <Grid item xs={5}>
          <FormControl label="Nội dung" padding={0}>
            <TextField
              {...register('name')}
              placeholder=""
              inputProps={{
                maxLength: 200
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl label="Loại" padding={0}>
            <Controller
              name="type"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {PROGRAM_TYPE.map((type, i) => (
                    <MenuItem value={type.value} key={i}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
};

export default SearchApprovalConfig;
