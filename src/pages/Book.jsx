import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Slider,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookById } from "../redux/books/operations";
import {
  selectBooksLoading,
  selectBooksError,
  selectCurrentBook,
} from "../redux/books/selectors";
import {
  addOrUpdateRating,
  deleteRating,
  getBookRatings,
  getUserRatings,
} from "../redux/ratings/operations";
import { selectIsLoggedIn, selectUser } from "../redux/auth/selectors";
import { selectUserRatings } from "../redux/ratings/selectors";
import toast from "react-hot-toast";
import { useRef } from "react";

const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const fallbackCover =
    "https://m.media-amazon.com/images/I/81QPHl7zgbL._AC_UF1000,1000_QL80_.jpg";

  const book = useSelector(selectCurrentBook);
  const isLoading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRatings = useSelector(selectUserRatings);

  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isExtraSmallScreen = useMediaQuery("(max-width: 400px)");

  useEffect(() => {
    if (book?.imageUrlL) {
      setImgSrc(book.imageUrlL);
    }
  }, [book]);

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

  useEffect(() => {
    dispatch(getBookById(bookId));
    if (isLoggedIn) {
      dispatch(getUserRatings());
      dispatch(getBookRatings(bookId));
    }
  }, [dispatch, bookId, isLoggedIn]);

  useEffect(() => {
    if (userRatings && userRatings.length > 0) {
      const userRating = userRatings.find((r) => r.bookId === bookId);
      if (userRating) {
        setRating(userRating.rating);
        setComment(userRating.comment || "");
      }
    }
  }, [userRatings, bookId]);

  const handleModalOpen = () => {
    if (!isLoggedIn) {
      toast.error("Будь ласка зареєструйтесь щоб оцінювати книги");
      return;
    }
    setOpenModal(true);
  };

  const handleModalClose = () => setOpenModal(false);

  const handleSave = () => {
    if (!isLoggedIn) {
      toast.error("Будь ласка зареєструйтесь щоб оцінювати книги");
      return;
    }

    dispatch(addOrUpdateRating({ bookId, rating, comment }));
    setOpenModal(false);
  };

  const handleDelete = () => {
    if (!isLoggedIn) {
      toast.error("Будь ласка зареєструйтесь щоб видаляти оцінки");
      return;
    }

    dispatch(deleteRating({ bookId }));
    setRating(null);
    setComment("");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Помилка завантаження книги: {error}
        </Typography>
      </Box>
    );
  }

  if (!book) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Книга не знайдена</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "center" : "flex-start",
        padding: 4,
        gap: 3,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      })}
    >
      {/* Book Image */}
      <Box
        component="img"
        src={imgSrc || fallbackCover}
        alt={book.bookTitle}
        ref={imgRef}
        onError={() => setImgSrc(fallbackCover)}
        sx={{
          width: isSmallScreen ? "100%" : "40%",
          maxWidth: "400px",
          height: "auto",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: (theme) =>
            imgSrc === fallbackCover ? theme.palette.grey[200] : "transparent",
        }}
      />
      {/* Text Content */}
      <Box
        sx={{
          width: isSmallScreen ? "min(400px, 100%)" : "60%",
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontSize={{ xs: 24, sm: 28, md: 32 }}>
          {book.bookTitle}{" "}
          <Typography color="info" variant="body">
            {book.avgRating?.toFixed(2)}
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          fontSize={{ xs: 16, md: 18 }}
        >
          <b>Автор:</b> {book.bookAuthor} | <b>Видавництво:</b> {book.publisher}{" "}
          | <b>Рік:</b> {book.yearOfPublication}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom fontSize={{ xs: 16, md: 18 }}>
            {isLoggedIn ? (
              <>
                Ваша оцінка: <b>{rating || "Без оцінки"}</b>
              </>
            ) : (
              <>Увійдіть, щоб оцінити книгу</>
            )}
          </Typography>
          {comment && (
            <Typography
              variant="body2"
              fontSize={{ xs: 16, md: 18 }}
              sx={{
                fontStyle: "italic",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                padding: 1,
                borderRadius: 2,
              }}
            >
              &ldquo;{comment}&rdquo;
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: isExtraSmallScreen ? 0 : 2,
            flexDirection: isExtraSmallScreen ? "column-reverse" : "row",
          }}
        >
          {isLoggedIn && rating !== null && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ mt: 2, alignSelf: "flex-start", padding: "10px 20px" }}
            >
              Видалити оцінку
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
            sx={{ mt: 2, alignSelf: "flex-start", padding: "10px 20px" }}
          >
            {isLoggedIn ? "Оцінити" : "Увійдіть щоб оцінити"}
          </Button>
        </Box>
      </Box>

      {/* Modal for Rating and Comment */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(400px, 90%)",
            bgcolor: theme.palette.background.paper,
            border: "none",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
          })}
        >
          <Typography variant="h5" gutterBottom color="text.primary">
            Оцінити
          </Typography>
          <Typography gutterBottom color="text.secondary">
            Від 1 до 10:
          </Typography>
          <Slider
            value={rating || 0}
            min={1}
            max={10}
            step={1}
            onChange={(e, newValue) => setRating(newValue)}
            marks
            valueLabelDisplay="auto"
            sx={{
              color: "primary.main",
            }}
          />
          <TextField
            label="Коментар"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={handleModalClose}
              color="error"
              variant="outlined"
              sx={{
                padding: "10px 20px",
              }}
            >
              Відміна
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
              }}
            >
              Зберегти
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Book;
