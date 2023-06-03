import { createSlice } from '@reduxjs/toolkit';
import { fetchCourseDetail } from '../thunk/courseDetailThunk';

export const initialState = {
  lessonData: {},
  selectedLecture: {},
  isTheaterView: false,
  firstPreviewUrl: '',
  lessonStructure: [],
  currentTimeToSeek: 0,
  isChooseTimeFromNote: false
};

const courseDetailSlice = createSlice({
  name: 'courseDetail',
  initialState: initialState,
  reducers: {
    setLessonData: (state, action) => {
      state.lessonData = action.payload;
    },
    setSelectLecture: (state, action) => {
      state.selectedLecture = action.payload;
      state.firstPreviewUrl = '';
    },
    setTheaterView: (state) => {
      state.isTheaterView = !state.isTheaterView;
    },
    setFirstPreviewUrl: (state, action) => {
      state.firstPreviewUrl = action.payload;
    },
    setLessonStructure: (state, action) => {
      state.lessonStructure = action.payload;
    },
    setCurrentTimeToSeek: (state, action) => {
      state.currentTimeToSeek = action.payload;
      state.isChooseTimeFromNote = true;
    },
    setChooseTimeFromNote: (state, action) => {
      state.isChooseTimeFromNote = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        if (action.payload) {
          state.lessonData = action.payload;
        } else throw Error({ message: 'Fail!' });
      })
      .addCase(fetchCourseDetail.rejected, (_state, action) => {
        throw { message: action.payload?.message };
      });
  }
});

export const {
  setSelectLecture,
  setTheaterView,
  setFirstPreviewUrl,
  setLessonStructure,
  setLessonData,
  setCurrentTimeToSeek,
  setChooseTimeFromNote
} = courseDetailSlice.actions;
export default courseDetailSlice.reducer;
