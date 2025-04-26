import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const RatedCard = ({ book, rating, isSmall }) => {
  return (
    <Link to={`/books/${book?._id}`}>
      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardActionArea
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 120, height: 180, borderRadius: 2, mr: 3 }}
            image={book?.imageUrlL}
            alt={book?.bookTitle}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {book?.bookTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {book?.bookAuthor}
            </Typography>
            <Typography variant="body2" mt={1}>
              Your Rating: <strong>{rating} / 10</strong>
            </Typography>
            {book?.comment && (
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 3,
                }}
              >
                {!isSmall && `"${book?.comment}"`}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default RatedCard;
