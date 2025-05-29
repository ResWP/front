import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useFilteredBooks = (rated, limit = 10) => {
  const [searchParams] = useSearchParams();
  const [currentLimit, setCurrentLimit] = useState(limit);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [hasMoreBooks, setHasMoreBooks] = useState(false);
  console.log(rated);
  useEffect(() => {
    // Extract books from rated items and include the rating information
    let booksWithRatings = rated.map((item) => ({
      ...item.book,
      comment: item.comment,
      userRating: item.rating, // Include the user's rating
    }));
    console.log(rated);
    const query = searchParams.get("query");
    const author = searchParams.get("author");
    const publisher = searchParams.get("publisher");
    const sortby = searchParams.get("sortby");
    const order = searchParams.get("order");
    const rate = searchParams.get("rate");
    const year = searchParams.get("year"); // Changed from 'date' to 'year'

    // Apply filters
    let filtered = [...booksWithRatings];

    if (query) {
      filtered = filtered.filter((book) =>
        book?.bookTitle?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (author) {
      filtered = filtered.filter((book) =>
        book?.bookAuthor?.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (publisher) {
      filtered = filtered.filter((book) =>
        book?.publisher?.toLowerCase().includes(publisher.toLowerCase())
      );
    }

    if (rate) {
      const [minRate, maxRate] = rate.split(",").map(Number);
      filtered = filtered.filter(
        (book) => book.userRating >= minRate && book.userRating <= maxRate
      );
    }

    if (year) {
      const [minYear, maxYear] = year.split(",").map(Number);
      filtered = filtered.filter((book) => {
        const pubYear = book.yearOfPublication;
        return pubYear >= minYear && pubYear <= maxYear;
      });
    }

    if (sortby) {
      filtered = filtered.sort((a, b) => {
        // Handle different sort fields
        let aValue, bValue;

        if (sortby === "rating") {
          aValue = a.userRating;
          bValue = b.userRating;
        } else if (sortby === "year") {
          aValue = a.yearOfPublication;
          bValue = b.yearOfPublication;
        } else {
          aValue = a[sortby];
          bValue = b[sortby];
        }

        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredBooks(filtered);
    setDisplayedBooks(filtered.slice(0, currentLimit));
    setHasMoreBooks(currentLimit < filtered.length);
  }, [searchParams, rated, currentLimit]);

  const loadMore = () => {
    setCurrentLimit((prev) => prev + limit);
  };

  useEffect(() => {
    setDisplayedBooks(filteredBooks.slice(0, currentLimit));
    setHasMoreBooks(currentLimit < filteredBooks.length);
  }, [filteredBooks, currentLimit]);

  return {
    filteredBooks: displayedBooks,
    loadMore,
    hasMoreBooks,
    totalBooks: filteredBooks.length,
  };
};

export default useFilteredBooks;
