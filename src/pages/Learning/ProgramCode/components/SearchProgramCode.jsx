import React, { useEffect, useState } from 'react';

import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { Controller, useForm } from 'react-hook-form';
import { ProgramAPI } from 'apis/ProgramCode';
import { listYear } from './CreateUpdateProgram.const';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300
    }
  }
};
const defaultValues = {
  program: '',
  key: 'all',
  year: new Date().getFullYear()
};
const SearchProgramCode = ({ setSearchParams }) => {
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: defaultValues
  });
  const [listKey, setListKey] = useState([]);

  useEffect(() => {
    getListKey();
  }, []);
  const getListKey = async () => {
    try {
      const { data } = await ProgramAPI.getListKey();
      setListKey(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  function handleSearch(values) {
    setSearchParams({ ...formatReq(values) });
  }
  function handleReset() {
    reset();
    setSearchParams({ ...formatReq(defaultValues) });
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Grid container direction="row" alignItems="flex-end" spacing={2}>
        <Grid item xs={6}>
          <FormControl label="Tìm kiếm theo từ khóa" padding={0}>
            <TextField
              {...register('program')}
              placeholder="Nhập nội dung Nhóm chương trình hoặc Chương trình"
            />
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl label="Mã chương trình" padding={0}>
            <TextField {...register('code')} placeholder="Mã chương trình" />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl label="Khóa" padding={0}>
            <Controller
              name="key"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  MenuProps={MenuProps}
                  placeholder="Chọn loại khóa học">
                  <MenuItem value="all">Tất cả</MenuItem>
                  {listKey.map((type, i) => (
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
        <Grid item xs={2}>
          <FormControl label="Năm" padding={0}>
            <Controller
              name="year"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange} MenuProps={MenuProps}>
                  {listYear.map((year, i) => (
                    <MenuItem value={year} key={i}>
                      {year}
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

export default SearchProgramCode;
