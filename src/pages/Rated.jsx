// Rated.jsx - Updated to work with Redux, URL sync, and pagination
import {
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Button,
} from "@mui/material";
import FilterBox from "../components/FilterUtils/FilterBox";
import SearchBar from "../components/FilterUtils/SearchBar";
import Sort from "../components/FilterUtils/Sort";
import SortListContainer from "../components/Structures/SearchSortBar";
import FilterListBox from "../components/Structures/FilterListBox";
import RatedList from "../components/ListComponents/RatedList";
import { PageTitle, SubTitle } from "../components/Structures/TitleText";
import EmptyMessage from "../components/Structures/EmptyMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  selectRatingsLoading,
  selectUserRatings,
  selectRatingsError,
} from "../redux/ratings/selectors";
import {
  selectFilters,
  selectSortBy,
  selectSortOrder,
} from "../redux/books/selectors";
import { getUserRatings } from "../redux/ratings/operations";
import { setFilter, setSort } from "../redux/books/slice";

const Rated = () => {
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width: 390px)");

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Local pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this value as needed

  const ratedBooks = useSelector(selectUserRatings);
  const isLoading = useSelector(selectRatingsLoading);
  const error = useSelector(selectRatingsError);
  const filters = useSelector(selectFilters);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  // Sync URL params with Redux state and pagination
  useEffect(() => {
    const urlParams = Object.fromEntries(searchParams);

    // Convert URL params to filter format
    const newFilters = {
      title: urlParams.query || "",
      author: urlParams.author || "",
      publisher: urlParams.publisher || "",
      minYear: urlParams.dateMin ? parseInt(urlParams.dateMin) : undefined,
      maxYear: urlParams.dateMax ? parseInt(urlParams.dateMax) : undefined,
      minAvgRating: urlParams.rateMin
        ? parseFloat(urlParams.rateMin)
        : undefined,
      maxAvgRating: urlParams.rateMax
        ? parseFloat(urlParams.rateMax)
        : undefined,
    };

    // Update Redux state with URL params
    dispatch(setFilter(newFilters));

    // Update sorting if present in URL
    if (urlParams.sortby || urlParams.order) {
      dispatch(
        setSort({
          sortBy: urlParams.sortby || sortBy,
          sortOrder: urlParams.order || sortOrder,
        })
      );
    }

    // Update page if present in URL
    if (urlParams.page) {
      setCurrentPage(parseInt(urlParams.page));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams, dispatch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    // Update URL to reflect page reset
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    setSearchParams(params);
  }, [filters, sortBy, sortOrder]);

  // Fetch user ratings on component mount
  useEffect(() => {
    dispatch(getUserRatings());
  }, [dispatch]);

  // Client-side filtering and sorting of rated books
  const filteredAndSortedBooks = useMemo(() => {
    if (!ratedBooks || ratedBooks.length === 0) return [];

    let filtered = ratedBooks.filter((ratedBook) => {
      const book = ratedBook.book; // Handle different data structures

      // Apply filters
      if (
        filters.title &&
        !book.bookTitle?.toLowerCase().includes(filters.title.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.author &&
        !book.bookAuthor?.toLowerCase().includes(filters.author.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.publisher &&
        !book.publisher?.toLowerCase().includes(filters.publisher.toLowerCase())
      ) {
        return false;
      }

      if (filters.minYear && book.yearOfPublication < filters.minYear) {
        return false;
      }

      if (filters.maxYear && book.yearOfPublication > filters.maxYear) {
        return false;
      }

      // For user ratings, we can filter by the user's own rating or the book's average rating
      const userRating = ratedBook.rating;
      const avgRating = book.avgRating;

      if (filters.minAvgRating) {
        // Use average rating if available, otherwise user's rating
        const ratingToCheck = avgRating !== undefined ? avgRating : userRating;
        if (ratingToCheck < filters.minAvgRating) {
          return false;
        }
      }

      if (filters.maxAvgRating) {
        // Use average rating if available, otherwise user's rating
        const ratingToCheck = avgRating !== undefined ? avgRating : userRating;
        if (ratingToCheck > filters.maxAvgRating) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    if (sortBy && sortBy !== "_id") {
      filtered = [...filtered].sort((a, b) => {
        const bookA = a.book || a;
        const bookB = b.book || b;

        let valueA, valueB;

        switch (sortBy) {
          case "bookTitle":
            valueA = bookA.bookTitle || "";
            valueB = bookB.bookTitle || "";
            break;
          case "bookAuthor":
            valueA = bookA.bookAuthor || "";
            valueB = bookB.bookAuthor || "";
            break;
          case "publisher":
            valueA = bookA.publisher || "";
            valueB = bookB.publisher || "";
            break;
          case "yearOfPublication":
            valueA = bookA.yearOfPublication || 0;
            valueB = bookB.yearOfPublication || 0;
            break;
          case "avgRating":
            valueA =
              bookA.avgRating !== undefined ? bookA.avgRating : a.rating || 0;
            valueB =
              bookB.avgRating !== undefined ? bookB.avgRating : b.rating || 0;
            break;
          default:
            valueA = bookA._id || "";
            valueB = bookB._id || "";
        }

        if (typeof valueA === "string") {
          const comparison = valueA.localeCompare(valueB);
          return sortOrder === "desc" ? -comparison : comparison;
        } else {
          const comparison = valueA - valueB;
          return sortOrder === "desc" ? -comparison : comparison;
        }
      });
    }

    return filtered;
  }, [ratedBooks, filters, sortBy, sortOrder]);

  // Pagination calculations
  const totalItems = filteredAndSortedBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageBooks = filteredAndSortedBooks.slice(startIndex, endIndex);

  // Pagination info
  const pagination = {
    page: currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };

  // Extract ratings for the current page
  const ratings = useMemo(() => {
    return currentPageBooks.map((ratedBook) => ratedBook.rating);
  }, [currentPageBooks]);

  // Pagination handlers
  const loadNext = () => {
    if (pagination.hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      // Update URL with new page
      const params = new URLSearchParams(searchParams);
      params.set("page", nextPage.toString());
      setSearchParams(params);
    }
  };

  const loadPrev = () => {
    if (pagination.hasPreviousPage) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);

      // Update URL with new page
      const params = new URLSearchParams(searchParams);
      if (prevPage === 1) {
        params.delete("page");
      } else {
        params.set("page", prevPage.toString());
      }
      setSearchParams(params);
    }
  };

  if (isLoading) {
    return (
      <Box>
        <PageTitle>Ваші оцінки</PageTitle>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <PageTitle>Ваші оцінки</PageTitle>
        <EmptyMessage>Помилка завантаження оцінок: {error}</EmptyMessage>
      </Box>
    );
  }

  return (
    <Box>
      <PageTitle>Ваші оцінки</PageTitle>
      <SubTitle>
        Пориньте у власний книжковий світ. Переглядайте книги, які ви оцінили,
        перечитуйте залишені вами коментарі та аналізуйте свої вподобання, щоб
        обрати наступну захопливу історію.
      </SubTitle>

      <SortListContainer isSmall={isSmall}>
        <SearchBar />
        <Sort />
      </SortListContainer>

      <FilterListBox isWide={isWide}>
        <FilterBox isWide={isWide} />

        {filteredAndSortedBooks.length > 0 ? (
          <div style={{ width: "100%" }}>
            <RatedList
              isSmall={isExtraSmall}
              books={currentPageBooks.map((ratedBook) => ratedBook.book)}
              ratings={ratings}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Box
                sx={{
                  mt: 3,
                  gap: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {pagination.hasPreviousPage && (
                  <Button variant="contained" onClick={loadPrev}>
                    Попередня сторінка
                  </Button>
                )}

                <Box
                  sx={{
                    fontSize: "14px",
                    color: "text.secondary",
                    minWidth: "fit-content",
                  }}
                >
                  Сторінка {pagination.page} із {pagination.totalPages}
                </Box>

                {pagination.hasNextPage && (
                  <Button variant="contained" onClick={loadNext}>
                    Наступна сторінка
                  </Button>
                )}
              </Box>
            )}
          </div>
        ) : ratedBooks.length === 0 ? (
          <EmptyMessage>
            Ви ще не оцінили жодної книги. Почніть досліджувати нашу бібліотеку
            та залишайте свої оцінки!
          </EmptyMessage>
        ) : (
          <EmptyMessage>
            Жодна з ваших оцінених книг не відповідає поточним фільтрам.
            Спробуйте змінити критерії пошуку.
          </EmptyMessage>
        )}
      </FilterListBox>
    </Box>
  );
};

export default Rated;
