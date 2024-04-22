import { createSlice } from '@reduxjs/toolkit';
import { User } from './types';
import { userApi } from '../api/user.api';

const initialState: User = {
  id: '',
  fullName: '',
  email: '',
  createdAt: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
    },
    removeUser(state) {
      state.id = '';
      state.fullName = '';
      state.email = '';
      state.createdAt = '';
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(userApi.endpoints.signIn.matchFulfilled, (state, { payload }) => {
        const user = payload.user;

        state.id = user.uid;
        state.fullName = user.displayName || '';
        state.email = user.email || '';
        state.createdAt = user.metadata.creationTime || '';
      })
      .addMatcher(userApi.endpoints.signUp.matchFulfilled, (state, { payload: user }) => {
        state.id = user.id;
        state.fullName = user.fullName;
        state.email = user.email;
        state.createdAt = user.createdAt;
      })
      .addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, { payload: user }) => {
        state.id = user?.id || '';
        state.fullName = user?.fullName || '';
        state.email = user?.email || '';
        state.createdAt = user?.createdAt || '';
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
