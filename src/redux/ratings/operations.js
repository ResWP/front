import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const addOrUpdateRating = createAsyncThunk(
  "/ratings/addOrUpdateRating",
  async ({ bookId, rating, comment = "" }, thunkAPI) => {
    try {
      // Check if user is logged in
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        toast.error("You must be logged in to rate books");
        return thunkAPI.rejectWithValue("User not authenticated");
      }

      // Make sure auth header is set
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await axios.post(`/ratings/${bookId}`, {
        rating,
        comment,
      });
      toast.success("Rating saved successfully");
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Delete a rating for a book
export const deleteRating = createAsyncThunk(
  "/ratings/deleteRating",
  async ({ bookId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        toast.error("You must be logged in to manage ratings");
        return thunkAPI.rejectWithValue("User not authenticated");
      }

      // Make sure auth header is set
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await axios.delete(`/ratings/${bookId}`);
      toast.success("Rating removed successfully");
      return { ...data, bookId };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Get all ratings for the current user
export const getUserRatings = createAsyncThunk(
  "/ratings/getUserRatings",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        console.log("User not authenticated");
        toast.error("You must be logged in to view your ratings");
        return thunkAPI.rejectWithValue("User not authenticated");
      }

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await axios.get("/ratings/user");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get all ratings for a specific book
export const getBookRatings = createAsyncThunk(
  "/ratings/getBookRatings",
  async (bookId, thunkAPI) => {
    try {
      const { data } = await axios.get(`/ratings/${bookId}`);
      return { bookId, data: data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
