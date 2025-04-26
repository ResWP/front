import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  selectAllBooks,
  selectBooksLoading,
  selectBooksError,
  selectPagination,
} from "../redux/books/selectors";

const Library = () => {
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const isLoading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
  const { page, totalPages, hasNextPage, hasPreviousPage } =
    useSelector(selectPagination);

  useEffect(() => {
    dispatch(getBooks({ page }));
  }, [dispatch, page]);

  const loadNext = () => {
    if (page < totalPages) {
      dispatch(getBooks({ page: page + 1 }));
    }
  };
  const loadPrev = () => {
    if (page < totalPages) {
      dispatch(getBooks({ page: page - 1 }));
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
        {isLoading && page === 1 ? (
          <Box sx={{ textAlign: "center", m: "auto" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <EmptyMessage>Помилка завантаження книг: {error}</EmptyMessage>
        ) : books.length ? (
          <div style={{ width: "100%" }}>
            <LibraryList books={books} />
            {page < totalPages && (
              <Box
                sx={{
                  mt: 3,
                  gap: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {hasPreviousPage && (
                  <Button
                    variant="contained"
                    onClick={loadPrev}
                    disabled={isLoading}
                  >
                    {isLoading ? "Секундочку..." : "Попередня сторінка"}
                  </Button>
                )}
                {hasNextPage && (
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
