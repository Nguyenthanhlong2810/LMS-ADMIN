import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AdminAPI } from 'apis/Admin';

export const initialState = {
  securityAreas: []
};

export const fetchSecurityArea = createAsyncThunk('fetch/securityArea', async (_, thunkAPI) => {
  try {
    const result = await AdminAPI.getSecurityArea();
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const SecurityAreaSlice = createSlice({
  name: 'securityArea',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecurityArea.fulfilled, (state, action) => {
        const payload = action.payload;
        state.securityAreas = payload;
      })
      .addCase(fetchSecurityArea.rejected, (_state, action) => {
        throw action.payload;
      });
  }
});

// export const { signOut } = SecurityAreaSlice.actions;

export default SecurityAreaSlice.reducer;
