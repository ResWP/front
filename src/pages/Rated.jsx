import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FilterBox from "../components/FilterUtils/FilterBox";
import SearchBar from "../components/FilterUtils/SearchBar";
import Sort from "../components/FilterUtils/Sort";
import ratedBooks from "../data/ratedBooks";
import SortListContainer from "../components/Structures/SearchSortBar";
import FilterListBox from "../components/Structures/FilterListBox";
import RatedList from "../components/ListComponents/RatedList";

const Rated = () => {
	const theme = useTheme();
	const isWide = useMediaQuery(theme.breakpoints.up("md"));
	const isSmall = useMediaQuery("(max-width: 390px)");

	return (
		<Box>
			<Typography variant="h4" as="h1" marginBlock={2}>
				My Rated Books
			</Typography>
			<SortListContainer isSmall={isSmall}>
				<SearchBar />
				<Sort isSmall={isSmall} />
			</SortListContainer>
			<FilterListBox isWide={isWide}>
				<FilterBox isWide={isWide} />
				<RatedList isSmall={isSmall} ratedBooks={ratedBooks} />
			</FilterListBox>
		</Box>
	);
};

export default Rated;
