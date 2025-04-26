import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    age: null,
    location: null,
  },
  token: null,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null, age: null, location: null };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setUserDetails } = authSlice.actions;
export const authReducer = authSlice.reducer;
