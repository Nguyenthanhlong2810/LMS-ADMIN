import React from 'react';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { FAQ_STATUS } from 'consts';
import { formatReq } from 'helpers';
import { FormControl } from 'components';
import { Controller, useForm } from 'react-hook-form';

const Filter = ({ setSearchParams }) => {
  const defaultValues = { name: '', status: 'all' };
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: defaultValues
  });
  async function handleSearch(values) {
    setSearchParams({ ...formatReq(values) });
  }
  async function handleReset() {
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
        <Grid item xs={8}>
          <FormControl label="Từ khoá" padding={0}>
            <TextField {...register('name')} placeholder="Nhập chủ đề" />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl label="Trạng thái" padding={0}>
            <Controller
              name="status"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange} placeholder="Chọn loại khóa học">
                  <MenuItem value="all">Tất cả</MenuItem>
                  {FAQ_STATUS.map((status, i) => (
                    <MenuItem value={status.value} key={i}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" className="mt-4">
        <Button
          size="large"
          variant="contained"
          className="mr-3"
          onClick={handleReset}
          sx={{ backgroundColor: '#A9A9A9' }}>
          Đặt lại
        </Button>
        <Button size="large" variant="contained" type="submit">
          Tìm kiếm
        </Button>
      </Grid>
    </form>
  );
};

export default Filter;
