import React from 'react';

import { Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { NEW_STATUS, NEWS_TYPE } from './const';
import { Controller, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';

const SearchNews = ({ setSearchParams }) => {
  const defaultValues = { keyword: '', contentType: 'all', status: 'all' };
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
        spacing={0}>
        <Grid item xs={5}>
          <FormControl label="Từ khoá" padding={0}>
            <TextField
              {...register('keyword')}
              placeholder="Nhập nội dung của Tiêu đề hoặc nội dung của Nhãn"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl label="Loại tin" padding={0}>
            <Controller
              name="contentType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {NEWS_TYPE.map((type, i) => (
                    <MenuItem value={type.value} key={i}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl label="Trạng thái" padding={0}>
            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {NEW_STATUS.map((type, i) => (
                    <MenuItem value={type.value} key={i}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
};

export default SearchNews;
