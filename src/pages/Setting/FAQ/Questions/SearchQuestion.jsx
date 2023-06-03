import { FAQ_STATUS } from 'consts';
import React, { useEffect } from 'react';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { EllipsisMenuItemText, EllipsisSelect, FormControl } from 'components';
import { formatReq } from 'helpers';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListTopics } from 'store/reducers/FAQQuestionsSlice';

const Filter = ({ language, setSearchParams }) => {
  const dispatch = useDispatch();

  const { topics } = useSelector((state) => state.FAQQuestions);
  const defaultValues = { searchValues: '', topicId: 'all', status: 'all' };
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
  useEffect(() => {
    reset(defaultValues);
    dispatch(fetchListTopics({ pageSize: 100, pageNo: 1, language: language, status: 'APPLY' }));
  }, [language, reset]);

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}>
        <Grid item xs={6}>
          <FormControl label="Từ khoá" padding={0}>
            <TextField
              {...register('searchValues')}
              placeholder="Nhập nội dung câu hỏi hoặc tên người cập nhật"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl label="Chủ đề" padding={0}>
            <Controller
              name="topicId"
              render={({ field: { value, onChange } }) => (
                <EllipsisSelect value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {topics.map((topic, i) => (
                    <MenuItem value={topic.id} key={i} sx={{ whiteSpace: 'nowrap' }}>
                      <EllipsisMenuItemText>{topic.name}</EllipsisMenuItemText>
                    </MenuItem>
                  ))}
                </EllipsisSelect>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl label="Trạng thái" padding={0}>
            <Controller
              name="status"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
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
          onClick={handleReset}
          variant="contained"
          className="mr-3"
          sx={{ backgroundColor: '#A9A9A9' }}>
          Đặt lại
        </Button>
        <Button className="btn-text" size="large" variant="contained" type="submit">
          Tìm kiếm
        </Button>
      </Grid>
    </form>
  );
};

export default Filter;
