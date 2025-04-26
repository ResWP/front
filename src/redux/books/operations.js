import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all books with pagination, sorting, and filtering
export const getBooks = createAsyncThunk(
  "/books/getBooks",
  async (params = {}, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { books } = state;

      // Combine default state with any passed params
      const queryParams = new URLSearchParams({
        page: params.page || books.pagination.page,
        perPage: params.perPage || books.pagination.perPage,
        sortBy: params.sortBy || books.sortBy,
        sortOrder: params.sortOrder || books.sortOrder,
        ...books.filter,
        ...params.filter,
      });

      const { data } = await axios.get(`/books?${queryParams}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get book by ID
export const getBookById = createAsyncThunk(
  "books/getBookById",
  async (bookId, thunkAPI) => {
    try {
      const { data } = await axios.get(`/books/${bookId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get best rated books
export const getBestBooks = createAsyncThunk(
  "books/getBestBooks",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/books/best");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
// In your getRecentBooks function
export const getRecentBooks = createAsyncThunk(
  "books/getRecentBooks",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      // Explicitly set the auth header before this specific request
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        console.log("No authentication token available");
        return thunkAPI.rejectWithValue("No authentication token available");
      }

      const { data } = await axios.get("/books/recent");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
// Get special books (recommendations)
export const getSpecialBooks = createAsyncThunk(
  "books/getSpecialBooks",
  async (recommendationData = {}, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      // Explicitly set the auth header before this specific request
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        console.log("No authentication token available");
        return thunkAPI.rejectWithValue("No authentication token available");
      }

      const { data } = await axios.get("/books/special", {
        data: recommendationData,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
