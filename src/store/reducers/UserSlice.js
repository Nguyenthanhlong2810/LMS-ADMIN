import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAPI } from 'apis/User';
import { LOCAL_STORE } from 'consts';
import { localStorageHelper } from 'helpers';

export const initialState = {
  token: null,
  id: null,
  username: null,
  fullname: null,
  email: null,
  avatarUrl: null,
  site: null,
  position: null,
  managerName: null,
  managerEmail: null,
  department: null,
  division: null,
  appUserRoles: [],
  birthdate: null,
  phoneNumber: null
};

export const fetchUser = createAsyncThunk('user/me', async (user, thunkAPI) => {
  try {
    const result = await UserAPI.getCurrentUser();
    return result?.data?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      localStorageHelper.removeItem(LOCAL_STORE.TOKEN);
      return {
        ...initialState
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        const payload = action.payload;
        Object.assign(state, payload);
      })
      .addCase(fetchUser.rejected, (_state, action) => {
        throw action.payload;
      });
  }
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
