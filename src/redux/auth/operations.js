import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "https://tback-dalv.onrender.com";
axios.defaults.baseURL = "http://localhost:3000";

// Utility to add JWT
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /auth/register
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", credentials);
      return {
        user: res.data.data,
        token: null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/*
 * POST @ /auth/login
 * body: { email, password }
 */
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials);
      const accessToken = res.data.data.accessToken;
      setAuthHeader(accessToken);

      const userData = res.data.data.user || {
        email: credentials.email,
      };

      return {
        user: userData,
        token: accessToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/*
 * POST @ /auth/logout
 * headers: Authorization: Bearer token
 */
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});
