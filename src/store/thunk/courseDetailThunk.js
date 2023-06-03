import { createAsyncThunk } from '@reduxjs/toolkit';
import { MyCourseAPI } from 'apis/MyCourse/MyCourseAPI';

export const fetchCourseDetail = createAsyncThunk('course/getDetail', async (params, thunkAPI) => {
  try {
    const result = await MyCourseAPI.getCourseDetail(params);
    return result?.data?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
