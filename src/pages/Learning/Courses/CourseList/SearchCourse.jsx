import React from 'react';

import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { Controller, useForm } from 'react-hook-form';
import { COURSE_STATUS } from 'consts';

const defaultValues = { typeActive: 'all', name: '' };

const SearchCourse = ({ setSearchParams }) => {
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues
  });
  function handleSearch(values) {
    values.name = values.name.trim();
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
        <Grid item xs={7}>
          <FormControl label="Từ khóa" padding={0}>
            <TextField {...register('name')} placeholder="Nhập mã hoặc tên khóa học" />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl label="Trạng thái" padding={0}>
            <Controller
              name="typeActive"
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

export default SearchCourse;
