import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickname: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (initialState, { payload }) => ({
      ...initialState,
      userId: payload.userId,
      nickname: payload.nickname,
    }),
    authStateChange: (initialState, { payload: { stateChange } }) => ({
      ...initialState,
      stateChange,
    }),
    authSingOut: () => state,
  },
});
