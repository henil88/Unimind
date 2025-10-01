import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, loading: false, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      (state.loading = true), (state.error = null);
    },
    authSucces: (state, action) => {
      (state.loading = false), (state.user = action.payload.user);
    },
    authFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    logout: (state) => {
      (state.user = null), (state.error = null);
    },
  },
});

export const { authRequest, authSucces, authFail, logout } = authSlice.actions;
export default authSlice.reducer;
