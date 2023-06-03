import React from 'react';

import { Grid, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { useForm } from 'react-hook-form';

const SearchProgramCode = ({ setSearchParams }) => {
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
        <Grid item flex={1}>
          <FormControl label="Tìm kiếm theo từ khóa" padding={0}>
            <TextField {...register('name')} placeholder="Nhập tên hạng mục" />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
};

export default SearchProgramCode;
