// FilterBox.jsx - Updated to work with Redux and URL sync
import { Box, Button, TextField } from "@mui/material";
import RangeSlider from "./RangeSlider";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilter, clearFilter } from "../../redux/books/slice";

const FilterBox = ({ isWide }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [author, setAuthor] = useState(searchParams.get("author") || "");
  const [publisher, setPublisher] = useState(
    searchParams.get("publisher") || ""
  );

  // Update local state when URL params change
  useEffect(() => {
    setAuthor(searchParams.get("author") || "");
    setPublisher(searchParams.get("publisher") || "");
  }, [searchParams]);

  const handleFilter = () => {
    const newParams = { ...Object.fromEntries(searchParams) };

    // Update URL parameters
    if (author.trim()) {
      newParams.author = author.trim();
    } else {
      delete newParams.author;
    }

    if (publisher.trim()) {
      newParams.publisher = publisher.trim();
    } else {
      delete newParams.publisher;
    }

    // Reset to first page when applying filters
    delete newParams.page;

    setSearchParams(newParams);

    // Also update Redux state directly for immediate effect
    dispatch(
      setFilter({
        author: author.trim() || "",
        publisher: publisher.trim() || "",
      })
    );
  };

  const handleClear = () => {
    // Clear all filter-related URL params
    const newParams = {};

    // Keep only non-filter params (like page, sortby, order if needed)
    const paramsToKeep = [];
    paramsToKeep.forEach((param) => {
      const value = searchParams.get(param);
      if (value) newParams[param] = value;
    });

    setSearchParams(newParams);

    // Clear Redux filters
    dispatch(clearFilter());

    // Clear local state
    setAuthor("");
    setPublisher("");
  };

  return (
    <Box
      width={"100%"}
      maxWidth={isWide ? 320 : "100%"}
      maxHeight={500}
      p={3}
      bgcolor={"background.paper"}
      boxShadow={3}
      mb={4}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        id="filter-author"
        label="Автор"
        variant="standard"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleFilter();
          }
        }}
        sx={{ width: "100%" }}
      />

      <TextField
        id="filter-publisher"
        label="Видавництво"
        variant="standard"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleFilter();
          }
        }}
        sx={{ width: "100%" }}
      />

      <RangeSlider
        purpose={"rate"}
        title={"Рейтинг"}
        min={0}
        max={10}
        step={0.1}
      />

      <RangeSlider
        purpose={"date"}
        title={"Рік"}
        min={1995}
        max={2025}
        step={1}
      />

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button variant="contained" sx={{ flex: 1 }} onClick={handleFilter}>
          Застосувати
        </Button>

        <Button variant="outlined" sx={{ flex: 1 }} onClick={handleClear}>
          Очистити
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBox;
