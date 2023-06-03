import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { formatReq } from 'helpers';
import { EXAM_TYPES } from './config';

const defaultValues = {
  type: 'all',
  code: '',
  title: '',
  description: ''
};

function SearchExamination({ setSearchParams, largeSize }) {
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: defaultValues
  });

  const handleSearch = (values) => {
    setSearchParams({ ...formatReq(values) });
  };

  const handleReset = () => {
    reset();
    setSearchParams({ ...formatReq(defaultValues) });
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={largeSize ? 2 : 0}>
        <Grid item xs={largeSize ? 6 : 2}>
          <FormControl label="Loại bài kiểm tra" padding={0}>
            <Controller
              name="type"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {EXAM_TYPES.map((type, i) => (
                    <MenuItem value={type} key={i}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={largeSize ? 6 : 3}>
          <FormControl label="Mã bài kiểm tra quản lý" padding={0}>
            <TextField {...register('code')} />
          </FormControl>
        </Grid>
        <Grid item xs={largeSize ? 12 : 3}>
          <FormControl label="Tiêu đề bài kiểm tra" padding={0}>
            <TextField {...register('title')} />
          </FormControl>
        </Grid>
        <Grid item xs={largeSize ? 12 : 2}>
          <FormControl label="Mô tả" padding={0}>
            <TextField {...register('description')} />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
}

SearchExamination.propTypes = {
  setSearchParams: PropTypes.func
};

export default SearchExamination;
