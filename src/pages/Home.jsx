import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RowComponent from "../components/HomeComponents/RowComponent";
import { PageTitle, SubTitle } from "../components/Structures/TitleText";
import {
  getBestBooks,
  getRecentBooks,
  getSpecialBooks,
} from "../redux/books/operations";
import {
  selectBestBooks,
  selectRecentBooks,
  selectSpecialBooks,
} from "../redux/books/selectors";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import useDelayedDispatch from "../hook/useDelayedDispatch";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const mostPopularBooks = useSelector(selectBestBooks);
  const recommendedBooks = useSelector(selectSpecialBooks);
  const userRatedBooks = useSelector(selectRecentBooks);
  const TIME_BETWEEN_FETCHES = 3000;

  // useDelayedDispatch(getSpecialBooks, 0, TIME_BETWEEN_FETCHES);
  useDelayedDispatch(getBestBooks, 0, TIME_BETWEEN_FETCHES);
  // useDelayedDispatch(getRecentBooks, 0, TIME_BETWEEN_FETCHES);
  useEffect(() => {
    dispatch(getSpecialBooks());
    dispatch(getRecentBooks());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleRefreshRecommended = () => {
    dispatch(getSpecialBooks());
  };

  return (
    <Box>
      <PageTitle>Ласкаво просимо до LitPix</PageTitle>
      <SubTitle>
        Ваш особистий простір для відкриття, оцінки та вивчення книжок. Обирайте
        рекомендації, створені на основі ваших вподобань, діліться думками про
        прочитані книги і будуйте свій унікальний літературний шлях.
      </SubTitle>

      <RowComponent
        title="Вибір користувачів"
        books={mostPopularBooks}
        emptyMessage="Будь ласка, зачекайте, поки ми підготуємо для вас рекомендації"
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          mb={2}
          color="primary.contrastText"
        >
          Вам може сподобатись
        </Typography>
        {isLoggedIn && (
          <Button
            variant="outlined"
            sx={{
              color: "text.secondary",
              borderColor: "text.secondary",
              mb: "auto",
            }}
            onClick={handleRefreshRecommended}
          >
            Оновити рекомендації
          </Button>
        )}
      </Stack>
      <RowComponent
        title=""
        books={isLoggedIn ? recommendedBooks || [] : []}
        emptyMessage={
          isLoggedIn
            ? "Недостатньо оцінок для аналізу вподобань"
            : "Необхідно увійти, щоб отримати рекомендації"
        }
      />

      <RowComponent
        title="Ваші оцінки"
        books={isLoggedIn ? userRatedBooks || [] : []}
        emptyMessage={
          isLoggedIn
            ? "Ви ще не оцінили жодну книгу"
            : "Необхідно увійти, щоб побачити свої оцінки"
        }
      />

      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/books")}
        >
          Переглянути всі книги
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
