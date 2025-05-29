// booksSlice.js - Updated slice with better filter management
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
  filter: {
    title: "",
    author: "",
    publisher: "",
    minYear: undefined,
    maxYear: undefined,
    minAvgRating: undefined,
    maxAvgRating: undefined,
    isRated: undefined,
  },
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
      // Merge new filters with existing ones
      state.filter = { ...state.filter, ...action.payload };
      // Reset to first page when filters change
      state.pagination.page = 1;
    },
    clearFilter: (state) => {
      state.filter = {
        title: "",
        author: "",
        publisher: "",
        minYear: undefined,
        maxYear: undefined,
        minAvgRating: undefined,
        maxAvgRating: undefined,
        isRated: undefined,
      };
      state.pagination.page = 1;
    },
    setSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      if (sortBy) state.sortBy = sortBy;
      if (sortOrder) state.sortOrder = sortOrder;
      // Reset to first page when sorting changes
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.pagination.perPage = action.payload;
      state.pagination.page = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    // New actions for better URL sync
    setSearchQuery: (state, action) => {
      state.filter.title = action.payload;
      state.pagination.page = 1;
    },
    setAuthorFilter: (state, action) => {
      state.filter.author = action.payload;
      state.pagination.page = 1;
    },
    setPublisherFilter: (state, action) => {
      state.filter.publisher = action.payload;
      state.pagination.page = 1;
    },
    setYearRange: (state, action) => {
      const { minYear, maxYear } = action.payload;
      state.filter.minYear = minYear;
      state.filter.maxYear = maxYear;
      state.pagination.page = 1;
    },
    setRatingRange: (state, action) => {
      const { minAvgRating, maxAvgRating } = action.payload;
      state.filter.minAvgRating = minAvgRating;
      state.filter.maxAvgRating = maxAvgRating;
      state.pagination.page = 1;
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
  setSearchQuery,
  setAuthorFilter,
  setPublisherFilter,
  setYearRange,
  setRatingRange,
} = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
