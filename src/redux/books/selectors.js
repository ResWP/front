export const selectAllBooks = (state) => state.books.items;
export const selectCurrentBook = (state) => state.books.currentBook;
export const selectSpecialBooks = (state) => state.books.specialBooks;
export const selectBestBooks = (state) => state.books.bestBooks;
export const selectRecentBooks = (state) => state.books.recentBooks;

export const selectPagination = (state) => state.books.pagination;
export const selectCurrentPage = (state) => state.books.pagination.page;
export const selectPerPage = (state) => state.books.pagination.perPage;
export const selectTotalItems = (state) => state.books.pagination.totalItems;
export const selectTotalPages = (state) => state.books.pagination.totalPages;

export const selectFilter = (state) => state.books.filter;
export const selectSortBy = (state) => state.books.sortBy;
export const selectSortOrder = (state) => state.books.sortOrder;

export const selectBooksLoading = (state) => state.books.loading;
export const selectBooksError = (state) => state.books.error;
