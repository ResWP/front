import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RowComponent from "../components/HomeComponents/RowComponent";
import books from "../data/books";

const Home = () => {
	const mostPopularBooks = books;
	const recommendedBooks = books;
	const userRatedBooks = books;
	const navigate = useNavigate();

	return (
		<Box sx={{ padding: "20px" }}>
			{<RowComponent title="Most Popular" books={mostPopularBooks} />}
			{<RowComponent title="You May Like" books={recommendedBooks} />}
			{<RowComponent title="Recently rated" books={userRatedBooks} />}
			<Box sx={{ textAlign: "center", marginTop: "20px" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/books")}
				>
					Browse All Books
				</Button>
			</Box>
		</Box>
	);
};

export default Home;
