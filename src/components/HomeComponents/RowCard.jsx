import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RowCard = ({ book, isSmall }) => {
  return (
    <Link to={`/books/${book._id}`}>
      <Card
        sx={{
          width: isSmall ? 160 : 200,
          cursor: "pointer",
          flexShrink: 0,
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height={isSmall ? 205 : 260}
          image={book.imageUrlL}
          alt={book.bookTitle}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" fontWeight={600} noWrap>
            {book.bookTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {book.bookAuthor}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RowCard;
