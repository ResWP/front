import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const RatedCard = ({ book, rating, isSmall }) => {
  const [imgSrc, setImgSrc] = useState(book?.imageUrlL);
  const imgRef = useRef(null);
  const fallbackCover =
    "https://m.media-amazon.com/images/I/81QPHl7zgbL._AC_UF1000,1000_QL80_.jpg";

  useEffect(() => {
    if (imgRef.current) {
      const checkImageSize = () => {
        if (
          imgRef.current?.naturalWidth === 1 &&
          imgRef.current?.naturalHeight === 1
        ) {
          setImgSrc(fallbackCover);
        }
      };

      imgRef.current.addEventListener("load", checkImageSize);
      return () => {
        if (imgRef.current) {
          imgRef.current.removeEventListener("load", checkImageSize);
        }
      };
    }
  }, [imgSrc]);

  return (
    <Link to={`/books/${book?._id}`} style={{ textDecoration: "none" }}>
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
            sx={{
              width: 120,
              height: 180,
              borderRadius: 2,
              mr: 3,
              backgroundColor: (theme) =>
                imgSrc === fallbackCover
                  ? theme.palette.grey[200]
                  : "transparent",
            }}
            image={imgSrc}
            alt={book?.bookTitle || "Book cover"}
            ref={imgRef}
            onError={() => setImgSrc(fallbackCover)}
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
