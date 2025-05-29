import { IconButton, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import css from "./styles.module.css";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  const handleSearch = () => {
    const newParams = { ...Object.fromEntries(searchParams) };
    if (searchQuery) {
      newParams.query = searchQuery;
    } else {
      delete newParams.query;
    }
    setSearchParams(newParams);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Пошук по назві"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          borderRadius: 2,
          backgroundColor: "Background",
          height: "fit-content",
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />
      <IconButton className={css.searchIcon} onClick={handleSearch}>
        <CiSearch />
      </IconButton>
    </div>
  );
};

export default SearchBar;
