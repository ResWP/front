import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import LibraryCard from "./LibraryCard";

const LibraryList = ({ books }) => {
	return (
		<Grid2
			container
			mt={3}
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 12, md: 12 }}
		>
			{books.map((book) => {
				return (
					<Grid2
						key={"lb-" + book.id}
						size={{ xs: 2, sm: 4, md: 4, lg: 3 }}
						sx={{ textAlign: "center" }}
					>
						<Link to={`/books/${book.id}`}>
							<LibraryCard book={book} />
						</Link>
					</Grid2>
				);
			})}
		</Grid2>
	);
};

export default LibraryList;
