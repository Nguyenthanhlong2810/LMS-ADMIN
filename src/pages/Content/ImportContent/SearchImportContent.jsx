import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';

const defaultValues = {
  nameCodeContent: '',
  type: 'all'
};

function SearchImportContent({ setSearchParams, largeSize }) {
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: defaultValues
  });

  const handleSearch = (values) => {
    setSearchParams({ ...formatReq({ ...values, keySearch: values.nameCodeContent }) });
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
        <Grid item xs={largeSize ? 12 : 7}>
          <FormControl label="Tên hoặc mã nội dung" padding={0}>
            <TextField {...register('nameCodeContent')} placeholder="Nhập tên hoặc mã nội dung" />
          </FormControl>
        </Grid>
        <Grid item xs={largeSize ? 12 : 3}>
          <FormControl label="Loại nội dung" padding={0}>
            <Controller
              name="type"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange} placeholder="Chọn loại khóa học">
                  <MenuItem value="all">Tất cả</MenuItem>
                  <MenuItem value="DOCUMENT">DOCUMENT</MenuItem>
                  <MenuItem value="VIDEO">VIDEO</MenuItem>
                  <MenuItem value="AICC">AICC</MenuItem>
                  <MenuItem value="SCROM">SCROM</MenuItem>
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
}

SearchImportContent.propTypes = {
  setSearchParams: PropTypes.func
};

export default SearchImportContent;
