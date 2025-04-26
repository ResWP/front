import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RowComponent from "../components/HomeComponents/RowComponent";
import books from "../data/books";
import { PageTitle, SubTitle } from "../components/Structures/TitleText";
import {
  getBestBooks,
  getRecentBooks,
  getSpecialBooks,
} from "../redux/books/operations";
import { use, useEffect } from "react";
import {
  selectBestBooks,
  selectRecentBooks,
  selectSpecialBooks,
} from "../redux/books/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import useDelayedDispatch from "../hook/useDelayedDispatch";

const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const mostPopularBooks = useSelector(selectBestBooks);
  //   const mostPopularBooks = useSelector(selectBestBooks);
  // const recommendedBooks = books;
  const recommendedBooks = useSelector(selectSpecialBooks);
  const userRatedBooks = useSelector(selectRecentBooks);
  //   const userRatedBooks = books;

  const TIME_BETWEEN_FETCHES = 30000;

  useDelayedDispatch(getSpecialBooks, 0, TIME_BETWEEN_FETCHES);
  useDelayedDispatch(getBestBooks, 0, TIME_BETWEEN_FETCHES);
  useDelayedDispatch(getRecentBooks, 0, TIME_BETWEEN_FETCHES);

  const navigate = useNavigate();

  return (
    <Box>
      <PageTitle>Ласкаво просимо до LitPix</PageTitle>
      <SubTitle>
        Ваш особистий простір для відкриття, оцінки та вивчення книжок. Обирайте
        рекомендації, створені на основі ваших вподобань, діліться думками про
        прочитані книги і будуйте свій унікальний літературний шлях.
      </SubTitle>
      {
        <RowComponent
          title="Вибір користувачів"
          books={mostPopularBooks}
          emptyMessage="Будь ласка, зачекайте, поки ми підготуємо для вас рекомендації"
        />
      }
      {isLoggedIn ? (
        <RowComponent
          title="Вам може сподобатись"
          books={recommendedBooks ? recommendedBooks : []}
          emptyMessage="Недостатньо оцінок для аналізу вподобань"
        />
      ) : (
        <RowComponent
          title="Вам може сподобатись"
          books={[]}
          emptyMessage="Необхідно увійти, щоб отримати рекомендації"
        />
      )}
      {isLoggedIn ? (
        <RowComponent
          title="Ваші оцінки"
          books={userRatedBooks ? userRatedBooks : []}
          emptyMessage="Ви ще не оцінили жодну книгу"
        />
      ) : (
        <RowComponent
          title="Ваші оцінки"
          books={[]}
          emptyMessage="Необхідно увійти, щоб побачити свої оцінки"
        />
      )}
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
