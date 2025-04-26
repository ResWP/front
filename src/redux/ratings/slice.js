import { createSlice } from "@reduxjs/toolkit";
import {
  addOrUpdateRating,
  deleteRating,
  getUserRatings,
  getBookRatings,
} from "./operations";

const initialState = {
  userRatings: [],
  bookRatings: {},
  loading: false,
  error: null,
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    clearRatingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add or Update Rating
      .addCase(addOrUpdateRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrUpdateRating.fulfilled, (state, action) => {
        const { data } = action.payload;

        // Update userRatings array
        const existingRatingIndex = state.userRatings.findIndex(
          (rating) => rating.bookId === data.bookId
        );

        if (existingRatingIndex !== -1) {
          state.userRatings[existingRatingIndex] = data;
        } else {
          state.userRatings.push(data);
        }

        // Update bookRatings object
        if (state.bookRatings[data.bookId]) {
          const bookRatingIndex = state.bookRatings[data.bookId].findIndex(
            (rating) => rating.userId === data.userId
          );

          if (bookRatingIndex !== -1) {
            state.bookRatings[data.bookId][bookRatingIndex] = data;
          } else {
            state.bookRatings[data.bookId].push(data);
          }
        }

        state.loading = false;
      })
      .addCase(addOrUpdateRating.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Delete Rating
      .addCase(deleteRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        const { bookId, userId } = action.meta.arg;

        // Remove from userRatings
        state.userRatings = state.userRatings.filter(
          (rating) => rating.bookId !== bookId
        );

        // Remove from bookRatings
        if (state.bookRatings[bookId]) {
          state.bookRatings[bookId] = state.bookRatings[bookId].filter(
            (rating) => rating.userId !== userId
          );
        }

        state.loading = false;
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Get User Ratings
      .addCase(getUserRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRatings.fulfilled, (state, action) => {
        state.userRatings = action.payload.data;
        state.loading = false;
      })
      .addCase(getUserRatings.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Get Book Ratings
      .addCase(getBookRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookRatings.fulfilled, (state, action) => {
        const { bookId, data } = action.payload;
        state.bookRatings = {
          ...state.bookRatings,
          [bookId]: data,
        };
        state.loading = false;
      })
      .addCase(getBookRatings.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export const { clearRatingError } = ratingsSlice.actions;
export const ratingsReducer = ratingsSlice.reducer;
