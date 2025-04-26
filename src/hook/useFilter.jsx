import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import booksData from "../data/books";
import ratedBooks from "../data/ratedBooks";

const useFilteredBooks = (rated = false, limit = 4) => {
  const [searchParams] = useSearchParams();
  const [currentLimit, setCurrentLimit] = useState(limit);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [hasMoreBooks, setHasMoreBooks] = useState(false);

  useEffect(() => {
    let filtered = rated ? ratedBooks : booksData;

    const query = searchParams.get("query");
    const author = searchParams.get("author");
    const publisher = searchParams.get("publisher");
    const sortby = searchParams.get("sortby");
    const order = searchParams.get("order");
    const rate = searchParams.get("rate");
    const date = searchParams.get("date");

    if (query) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (author) {
      filtered = filtered.filter(
        (book) =>
          book.author &&
          book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (publisher) {
      filtered = filtered.filter(
        (book) =>
          book.publisher &&
          book.publisher.toLowerCase().includes(publisher.toLowerCase())
      );
    }

    if (rate) {
      const [minRate, maxRate] = rate.split(",").map(Number);
      filtered = filtered.filter(
        (book) => book.rate >= minRate && book.rate <= maxRate
      );
    }

    if (date) {
      const [minDate, maxDate] = date.split(",").map(Number);
      filtered = filtered.filter(
        (book) => book.year >= minDate && book.year <= maxDate
      );
    }

    if (sortby) {
      filtered = filtered.sort((a, b) => {
        if (a[sortby] < b[sortby]) return order === "asc" ? -1 : 1;
        if (a[sortby] > b[sortby]) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredBooks(filtered);
    setDisplayedBooks(filtered.slice(0, currentLimit));
    setHasMoreBooks(currentLimit < filtered.length);
  }, [searchParams, rated, currentLimit]);

  const loadMore = () => {
    setCurrentLimit((prevLimit) => prevLimit + limit);
  };

  useEffect(() => {
    setDisplayedBooks(filteredBooks.slice(0, currentLimit));
    setHasMoreBooks(currentLimit < filteredBooks.length);
  }, [filteredBooks, currentLimit]);

  return { filteredBooks: displayedBooks, loadMore, hasMoreBooks };
};

export default useFilteredBooks;
