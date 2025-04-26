import { Box, Typography, useMediaQuery } from "@mui/material";
import RowCard from "./RowCard";
import ScrollableRow from "./ScrollableRow";
import EmptyMessage from "../Structures/EmptyMessage";

const RowComponent = ({ title, emptyMessage, books = [] }) => {
  const isSmall = useMediaQuery("(max-width: 765px)");

  return (
    <Box sx={{ mb: isSmall ? 3 : 5 }}>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={isSmall ? 1 : 2}
        color="primary.contrastText"
      >
        {title}
      </Typography>
      {books.length ? (
        <ScrollableRow isSmall={isSmall}>
          {books.map((book) => (
            <RowCard key={"rw-" + book._id} book={book} isSmall={isSmall} />
          ))}
        </ScrollableRow>
      ) : (
        <EmptyMessage>{emptyMessage}</EmptyMessage>
      )}
    </Box>
  );
};

export default RowComponent;
