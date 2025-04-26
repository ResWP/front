import {
  CardActionArea,
  Card,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";

const BookCard = ({ book }) => {
  return (
    <Card sx={{ m: "auto", maxWidth: 220, width: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="100%"
          image={book.imageUrlL}
          alt="green iguana"
          sx={{ aspectRatio: "3/4", objectFit: "cover" }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" fontWeight={600} noWrap>
            {book.bookTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {book.bookAuthor}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
