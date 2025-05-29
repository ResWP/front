// Library.jsx - Updated to work properly with Redux and URL params
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  useMediaQuery,
  useTheme,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import FilterBox from "../components/FilterUtils/FilterBox";
import SearchBar from "../components/FilterUtils/SearchBar";
import LibraryList from "../components/ListComponents/LibraryList";
import Sort from "../components/FilterUtils/Sort";
import SearchSortBar from "../components/Structures/SearchSortBar";
import FilterListBox from "../components/Structures/FilterListBox";
import { PageTitle, SubTitle } from "../components/Structures/TitleText";
import EmptyMessage from "../components/Structures/EmptyMessage";
import { getBooks } from "../redux/books/operations";
import { setFilter, setSort, setPage } from "../redux/books/slice";
import {
  selectAllBooks,
  selectBooksLoading,
  selectBooksError,
  selectPagination,
  selectFilters,
  selectSortBy,
  selectSortOrder,
} from "../redux/books/selectors";

const Library = () => {
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const books = useSelector(selectAllBooks);
  const isLoading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
  const pagination = useSelector(selectPagination);
  const filters = useSelector(selectFilters);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  // Sync URL params with Redux state and fetch data
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
      dispatch(setPage(parseInt(urlParams.page)));
    }
  }, [searchParams, dispatch]);

  // Fetch books when filters, sorting, or pagination change
  useEffect(() => {
    dispatch(getBooks());
  }, [
    dispatch,
    filters,
    sortBy,
    sortOrder,
    pagination.page,
    pagination.perPage,
  ]);

  const loadNext = () => {
    if (pagination.hasNextPage) {
      dispatch(setPage(pagination.page + 1));
    }
  };

  const loadPrev = () => {
    if (pagination.hasPreviousPage) {
      dispatch(setPage(pagination.page - 1));
    }
  };

  return (
    <div>
      <PageTitle>Бібліотека</PageTitle>
      <SubTitle>
        Досліджуйте колекцію книг, яку ми підготували спеціально для вас.
        Відкривайте нові видання, повертайтеся до улюблених класиків і
        насолоджуйтеся читанням у будь-який час.
      </SubTitle>

      <SearchSortBar isSmall={isSmall}>
        <SearchBar />
        <Sort />
      </SearchSortBar>

      <FilterListBox isWide={isWide}>
        <FilterBox isWide={isWide} />

        {isLoading && pagination.page === 1 ? (
          <Box sx={{ textAlign: "center", m: "auto" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <EmptyMessage>Помилка завантаження книг: {error}</EmptyMessage>
        ) : books.length ? (
          <div style={{ width: "100%" }}>
            <LibraryList books={books} />

            {(pagination.hasNextPage || pagination.hasPreviousPage) && (
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
                  <Button
                    variant="contained"
                    onClick={loadPrev}
                    disabled={isLoading}
                  >
                    {isLoading ? "Секундочку..." : "Попередня сторінка"}
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
                  <Button
                    variant="contained"
                    onClick={loadNext}
                    disabled={isLoading}
                  >
                    {isLoading ? "Секундочку..." : "Наступна сторінка"}
                  </Button>
                )}
              </Box>
            )}
          </div>
        ) : (
          <EmptyMessage>Книг не знайдено</EmptyMessage>
        )}
      </FilterListBox>
    </div>
  );
};

export default Library;
