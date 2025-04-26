import { Box, useMediaQuery, useTheme } from "@mui/material";
import FilterBox from "../components/FilterUtils/FilterBox";
import SearchBar from "../components/FilterUtils/SearchBar";
import Sort from "../components/FilterUtils/Sort";
import SortListContainer from "../components/Structures/SearchSortBar";
import FilterListBox from "../components/Structures/FilterListBox";
import RatedList from "../components/ListComponents/RatedList";
import { PageTitle, SubTitle } from "../components/Structures/TitleText";
import useFilteredBooks from "../hook/useFilter";
import {
  selectRatingsLoading,
  selectUserRatings,
} from "../redux/ratings/selectors";
import { getUserRatings } from "../redux/ratings/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Rated = () => {
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width: 390px)");
  const dispatch = useDispatch();
  const ratedBooks = useSelector(selectUserRatings);
  const filteredBooks = useFilteredBooks(ratedBooks);
  const isLoading = useSelector(selectRatingsLoading);

  useEffect(() => {
    dispatch(getUserRatings());
  }, [dispatch]);
  console.log("Rated books:", ratedBooks);

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
        <RatedList isSmall={isExtraSmall} ratedBooks={ratedBooks} />
      </FilterListBox>
    </Box>
  );
};

export default Rated;
