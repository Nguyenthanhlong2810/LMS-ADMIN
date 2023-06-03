import React from 'react';

import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { Controller, useForm } from 'react-hook-form';
import { QUESTION_TYPES } from './questionBank.const';

const SearchQuestionBank = ({ setSearchParams }) => {
  const defaultValues = {
    type: 'all'
  };
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
        <Grid item xs={3}>
          <FormControl label="Loại câu hỏi" padding={0}>
            <Controller
              name="type"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange} placeholder="Chọn loại khóa học">
                  <MenuItem value="all">Tất cả</MenuItem>
                  {Object.values(QUESTION_TYPES).map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item flex={1}>
          <FormControl label="Mô tả" padding={0}>
            <TextField {...register('description')} />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl label="Mã câu hỏi" padding={0}>
            <TextField {...register('code')} />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
};

export default SearchQuestionBank;
