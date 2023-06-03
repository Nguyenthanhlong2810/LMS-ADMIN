import React from 'react';

import { Grid, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { useForm } from 'react-hook-form';

const SearchSurvey = ({ largeSize, setSearchParams }) => {
  const defaultValues = {
    name: ''
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
        <Grid item xs={largeSize ? 12 : 5}>
          <FormControl label="Tên khảo sát" padding={0}>
            <TextField
              {...register('name')}
              placeholder=""
              inputProps={{
                maxLength: 200
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={largeSize ? 12 : 5}>
          <FormControl label="Mô tả" padding={0}>
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

export default SearchSurvey;
