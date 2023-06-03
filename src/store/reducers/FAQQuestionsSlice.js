import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TopicAPI } from 'apis/FQA/topicApi';
import { DEFAULT_PAGESIZE } from 'consts';

const initialState = {
  isOpen: false,
  questions: [],
  topics: [],
  searchParams: {},
  loading: false,
  language: 'vn',
  error: '',
  rowCount: 0,
  pagination: {
    offset: 1,
    limit: DEFAULT_PAGESIZE
  }
};
export const fetchListTopics = createAsyncThunk('topic-question/fetch', async (params) => {
  const response = await TopicAPI.getList(params);
  return response.data;
});

export const FAQQuestionsSlice = createSlice({
  name: 'FAQQuestions',
  initialState,
  reducers: {
    updateSearchParam: (state, action) => {
      state.searchParams = action.payload;
    },
    updateState: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListTopics.fulfilled, (state, action) => {
      state.loading = true;
      state.topics = action.payload;
    });
  }
});

export const { updateSearchParam, updateState } = FAQQuestionsSlice.actions;

export default FAQQuestionsSlice.reducer;
