export const selectUserRatings = (state) => state.ratings.userRatings;

// Get all ratings for a specific book
export const selectBookRatings = (state, bookId) =>
  state.ratings.bookRatings[bookId] || [];

// Get user's rating for a specific book
export const selectUserRatingForBook = (state, bookId) => {
  const userId = state.auth.user?._id;
  return state.ratings.userRatings.find(
    (rating) => rating.bookId === bookId && rating.userId === userId
  );
};

// Calculate average rating for a book
export const selectAverageRatingForBook = (state, bookId) => {
  const bookRatings = state.ratings.bookRatings[bookId];

  if (!bookRatings || bookRatings.length === 0) {
    return null;
  }

  const sum = bookRatings.reduce((acc, rating) => acc + rating.rating, 0);
  return sum / bookRatings.length;
};

export const selectRatingsLoading = (state) => state.ratings.loading;
export const selectRatingsError = (state) => state.ratings.error;
