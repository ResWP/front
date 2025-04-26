import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LibraryCard from "./LibraryCard";

const LibraryList = ({ books }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 12, md: 12 }}
      width={"100%"}
      mt={{ xs: 2, sm: 4, md: 0 }}
    >
      {books.map((book) => {
        return (
          <Grid
            key={"lb-" + book._id}
            size={{ xs: 2, sm: 4, md: 4, lg: 3 }}
            sx={{ textAlign: "center" }}
            // style={{ width: "100%" }}
          >
            <Link to={`/books/${book._id}`}>
              <LibraryCard book={book} />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LibraryList;
