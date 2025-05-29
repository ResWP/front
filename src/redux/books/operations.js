import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all books with pagination, sorting, and filtering

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (params = {}, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { books } = state;

      // Build query parameters matching backend expectations
      const queryParams = new URLSearchParams();

      // Pagination
      queryParams.append("page", params.page || books.pagination.page);
      queryParams.append("perPage", params.perPage || books.pagination.perPage);

      // Sorting
      queryParams.append("sortBy", params.sortBy || books.sortBy);
      queryParams.append("sortOrder", params.sortOrder || books.sortOrder);

      // Filters - merge state filters with passed params
      const filters = { ...books.filter, ...params.filter };

      // Add filter parameters to query string
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
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

export const getRecentBooks = createAsyncThunk(
  "books/getRecentBooks",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        console.log("No authentication token available");
        return thunkAPI.rejectWithValue("No authentication token available");
      }

      const { data } = await axios.post("/books/recent");
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
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      console.log(state);

      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        console.log("No authentication token available");
        return thunkAPI.rejectWithValue("No authentication token available");
      }

      const { data } = await axios.post("/books/special");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
