import { Typography, useMediaQuery, useTheme } from "@mui/material";
import books from "../data/books";
import FilterBox from "../components/FilterUtils/FilterBox";
import SearchBar from "../components/FilterUtils/SearchBar";
import LibraryList from "../components/ListComponents/LibraryList";
import Sort from "../components/FilterUtils/Sort";
import SearchSortBar from "../components/Structures/SearchSortBar";
import FilterListBox from "../components/Structures/FilterListBox";

const Library = () => {
	const theme = useTheme();
	const isWide = useMediaQuery(theme.breakpoints.up("md"));
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<div>
			<Typography
				variant="h4"
				fontSize={{ xs: 24, md: 32 }}
				as="h1"
				mt={{ xs: 1, md: 3 }}
				mb={1}
			>
				Library
			</Typography>
			<Typography variant="body2" color="text.secondary" mb={2}>
				Explore our collection of books curated just for you. Discover new
				titles, revisit old favorites, and enjoy reading at your leisure.
			</Typography>
			<SearchSortBar isSmall={isSmall}>
				<SearchBar />
				<Sort isSmall={isSmall} />
			</SearchSortBar>
			<FilterListBox isWide={isWide}>
				<FilterBox isWide={isWide} />
				<LibraryList books={books} />
			</FilterListBox>
		</div>
	);
};

export default Library;
