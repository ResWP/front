import {
  CardActionArea,
  Card,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

const BookCard = ({ book }) => {
  const [imgSrc, setImgSrc] = useState(book.imageUrlL);
  const imgRef = useRef(null);
  const fallbackCover =
    "https://m.media-amazon.com/images/I/81QPHl7zgbL._AC_UF1000,1000_QL80_.jpg";

  useEffect(() => {
    if (imgRef.current) {
      const checkImageSize = () => {
        if (
          imgRef.current.naturalWidth === 1 &&
          imgRef.current.naturalHeight === 1
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
    <Card sx={{ m: "auto", maxWidth: 220, width: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="100%"
          image={imgSrc}
          alt={book.bookTitle || "Book cover"}
          ref={imgRef}
          onError={() => setImgSrc(fallbackCover)}
          sx={{
            aspectRatio: "3/4",
            objectFit: "cover",
            backgroundColor: (theme) =>
              imgSrc === fallbackCover
                ? theme.palette.grey[200]
                : "transparent",
          }}
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
