import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import RowCard from "./RowCard";
import ScrollableRow from "./ScrollableRow";

const RowComponent = ({ title, books = [] }) => {
	const isSmall = useMediaQuery("(max-width: 765px)");
	const theme = useTheme();

	return (
		<Box sx={{ mb: isSmall ? 3 : 5 }}>
			<Typography
				variant="h5"
				fontWeight={600}
				mb={isSmall ? 1 : 2}
				color={theme.palette.primary.contrastText}
			>
				{title}
			</Typography>
			<ScrollableRow isSmall={isSmall} theme={theme}>
				{books.length ? (
					books.map((book) => (
						<RowCard key={"rw-" + book.id} book={book} isSmall={isSmall} />
					))
				) : (
					<Typography
						variant="h5"
						fontWeight={600}
						mb={isSmall ? 1 : 2}
						color={theme.palette.primary.contrastText}
					>
						No books present
					</Typography>
				)}
			</ScrollableRow>
		</Box>
	);
};

export default RowComponent;
