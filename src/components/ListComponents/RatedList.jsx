import { Box } from "@mui/material";
import RatedCard from "./RatedCard";
import EmptyMessage from "../Structures/EmptyMessage";

const RatedList = ({ books, ratings, isSmall }) => {
  // ratedBooks has structure [{ rating, book: { ... } }, ...]
  // and we need to extract book from it
  // const books = ratedBooks.map((ratedBook) => ratedBook.book);
  // and we need to extract rating from it
  console.log(books);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: { xs: 2, sm: 4, md: 0 },
      }}
    >
      {books.length ? (
        books.map((book, index) => (
          <RatedCard
            key={`rtd-${book?._id}`}
            book={book}
            rating={ratings[index]}
            isSmall={isSmall}
          />
        ))
      ) : (
        <EmptyMessage>Оцінок не знайдено</EmptyMessage>
      )}
    </Box>
  );
};

export default RatedList;
