import { Box } from "@mui/material";
import RatedCard from "./RatedCard";

const RatedList = ({ ratedBooks, isSmall }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
			{ratedBooks.map((book) => (
				<RatedCard key={`rtd-${book.id}`} book={book} isSmall={isSmall} />
			))}
		</Box>
	);
};

export default RatedList;
