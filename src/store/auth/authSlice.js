import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "cheking", //authenticated, not-authenticated
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state /* action */) => {
      state.status = "cheking";
      state.user = {};
      state.token = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
