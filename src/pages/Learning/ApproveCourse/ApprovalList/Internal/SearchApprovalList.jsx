import React from 'react';

import { Grid, TextField, Select, MenuItem } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { APPROVE_STATUS } from 'consts';
const SearchApprovalCourse = ({ setSearchParams }) => {
  const defaultValues = { statusApprove: 'all', name: '' };
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
        // justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}>
        <Grid item xs={4}>
          <FormControl label="Trạng thái" padding={0}>
            <Controller
              name="statusApprove"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {APPROVE_STATUS.map((type, i) => (
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

        <Grid item xs={4}>
          <FormControl label="LDAP" padding={0}>
            <TextField
              {...register('ldap')}
              placeholder=""
              inputProps={{
                maxLength: 200
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          {/* <FormControl label="Hạn đăng ký" padding={0}>
            <Controller
              name="timework"
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  value={value}
                  onChange={onChange}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
              control={control}
            />
          </FormControl> */}
        </Grid>
        <Grid item xs={4}>
          <FormControl label="Nội dung" padding={0}>
            <TextField
              {...register('courseName')}
              placeholder=""
              inputProps={{
                maxLength: 200
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl label="Tên học viên" padding={0}>
            <TextField
              {...register('fullname')}
              placeholder=""
              inputProps={{
                maxLength: 200
              }}
            />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
};

export default SearchApprovalCourse;
