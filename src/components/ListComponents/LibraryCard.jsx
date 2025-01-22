import {
	CardActionArea,
	Card,
	Typography,
	CardContent,
	CardMedia,
} from "@mui/material";
// import BoxContainer from "./BoxContainer";

const BookCard = ({ book }) => {
	return (
		<Card sx={{ m: "auto", maxWidth: 220 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					width="100%"
					image={book.coverImage}
					alt="green iguana"
					sx={{ aspectRatio: "3/4", objectFit: "cover" }}
				/>
				<CardContent sx={{ textAlign: "center" }}>
					<Typography variant="body1" fontWeight={600} noWrap>
						{book.title}
					</Typography>
					<Typography variant="body2" color="text.secondary" noWrap>
						{book.author}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default BookCard;
