import React from 'react';

import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { Controller, useForm } from 'react-hook-form';
import { COURSE_STATUS } from 'consts';

const defaultValues = { status: 'all', name: '' };

const SearchSingleUser = ({ setSearchParams }) => {
  const { handleSubmit, control, register, reset } = useForm({
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
        spacing={0}>
        <Grid item xs={2.5}>
          <FormControl label="Tên học viên" padding={0}>
            <TextField {...register('fullname')} />
          </FormControl>
        </Grid>
        <Grid item xs={2.5}>
          <FormControl label="Bộ phận" padding={0}>
            <Controller
              name="department"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {COURSE_STATUS.map((type, i) => (
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
        <Grid item xs={2.5}>
          <FormControl label="Mã học viên" padding={0}>
            <TextField {...register('code')} />
          </FormControl>
        </Grid>
        <Grid item xs={2.5}>
          <FormControl label="Vị trí công việc" padding={0}>
            <Controller
              name="position"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {COURSE_STATUS.map((type, i) => (
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

export default SearchSingleUser;
