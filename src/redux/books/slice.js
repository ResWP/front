import { createSlice } from "@reduxjs/toolkit";
import {
  getBooks,
  getBookById,
  getSpecialBooks,
  getBestBooks,
  getRecentBooks,
} from "./operations";

const initialState = {
  items: [],
  currentBook: null,
  specialBooks: [],
  bestBooks: [],
  recentBooks: [],
  pagination: {
    page: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  filter: {},
  sortBy: "_id",
  sortOrder: "asc",
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
      state.pagination.page = 1;
    },
    clearFilter: (state) => {
      state.filter = {};
    },
    setSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy || state.sortBy;
      state.sortOrder = sortOrder || state.sortOrder;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.pagination.perPage = action.payload;
      state.pagination.page = 1; // Reset to first page when changing items per page
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Books
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          perPage: action.payload.perPage,
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviousPage,
        };
        state.loading = false;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Get Book By Id
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.currentBook = action.payload.data;
        state.loading = false;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Get Special Books
      .addCase(getSpecialBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecialBooks.fulfilled, (state, action) => {
        state.specialBooks = action.payload.data;
        state.loading = false;
      })
      .addCase(getSpecialBooks.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Get Best Books
      .addCase(getBestBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBestBooks.fulfilled, (state, action) => {
        state.bestBooks = action.payload.data;
        state.loading = false;
      })
      .addCase(getBestBooks.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Get Recent Books
      .addCase(getRecentBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentBooks.fulfilled, (state, action) => {
        state.recentBooks = action.payload.data;
        state.loading = false;
      })
      .addCase(getRecentBooks.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export const {
  setFilter,
  clearFilter,
  setSort,
  setPage,
  setPerPage,
  clearError,
} = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
