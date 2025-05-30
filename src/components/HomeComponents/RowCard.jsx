import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const RowCard = ({ book, isSmall }) => {
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
          image={imgSrc}
          alt={book?.bookTitle || "Book cover"}
          ref={imgRef}
          onError={() => setImgSrc(fallbackCover)}
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            backgroundColor: (theme) =>
              imgSrc === fallbackCover
                ? theme.palette.grey[200]
                : "transparent",
          }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" fontWeight={600} noWrap>
            {book?.bookTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {book?.bookAuthor}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RowCard;
