// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadTokenFromStorage = () => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  return token || null;
};

const initialState = {
  token: loadTokenFromStorage(),
  isAuthenticated: loadTokenFromStorage() ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
      sessionStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
});
export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
