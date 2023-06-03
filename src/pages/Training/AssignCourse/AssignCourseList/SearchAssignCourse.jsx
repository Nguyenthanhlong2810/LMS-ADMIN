import React from 'react';
import { Grid, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { useForm } from 'react-hook-form';

const SearchAssignCourse = ({ setSearchParams }) => {
  const defaultValues = {
    nameCourse: ''
  };
  const { handleSubmit, register, reset } = useForm({
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
        <Grid item xs={6}>
          <FormControl label="Tên khóa học" padding={0}>
            <TextField
              {...register('nameCourse')}
              placeholder=""
              inputProps={{
                maxLength: 200
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl label="Mã khóa học" padding={0}>
            <TextField
              {...register('codeCourse')}
              placeholder=""
              inputProps={{
                maxLength: 200
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl label="Mô tả về khóa học" padding={0}>
            <TextField
              {...register('description')}
              placeholder=""
              inputProps={{
                maxLength: 500
              }}
            />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
};

export default SearchAssignCourse;
