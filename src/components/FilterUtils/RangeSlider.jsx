// RangeSlider.jsx - Updated to work properly with URL params and Redux
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/books/slice";

function valuetext(value, purpose) {
  if (purpose === "rate") {
    return `${value}⭐`;
  }
  return `${value}`;
}

export default function RangeSlider({ purpose, title, min, max, step = 1 }) {
  const [value, setValue] = React.useState([min, max]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const minParam = purpose.toLowerCase() + "Min";
  const maxParam = purpose.toLowerCase() + "Max";

  // Initialize slider values from URL params
  React.useEffect(() => {
    const urlMinValue = searchParams.get(minParam);
    const urlMaxValue = searchParams.get(maxParam);

    let newMin = min;
    let newMax = max;

    if (urlMinValue !== null) {
      const parsedMin =
        purpose === "rate" ? parseFloat(urlMinValue) : parseInt(urlMinValue);
      if (!isNaN(parsedMin)) newMin = parsedMin;
    }

    if (urlMaxValue !== null) {
      const parsedMax =
        purpose === "rate" ? parseFloat(urlMaxValue) : parseInt(urlMaxValue);
      if (!isNaN(parsedMax)) newMax = parsedMax;
    }

    setValue([newMin, newMax]);
  }, [searchParams, minParam, maxParam, min, max, purpose]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, finalValue) => {
    const newParams = { ...Object.fromEntries(searchParams) };

    // Remove existing range parameters
    delete newParams[minParam];
    delete newParams[maxParam];

    // Add new parameters only if they differ from defaults
    if (finalValue[0] !== min) {
      newParams[minParam] = finalValue[0].toString();
    }

    if (finalValue[1] !== max) {
      newParams[maxParam] = finalValue[1].toString();
    }

    // Reset to first page when changing filters
    delete newParams.page;

    setSearchParams(newParams);

    // Update Redux state
    const filterUpdate = {};
    if (purpose === "rate") {
      filterUpdate.minAvgRating =
        finalValue[0] !== min ? finalValue[0] : undefined;
      filterUpdate.maxAvgRating =
        finalValue[1] !== max ? finalValue[1] : undefined;
    } else if (purpose === "date") {
      filterUpdate.minYear = finalValue[0] !== min ? finalValue[0] : undefined;
      filterUpdate.maxYear = finalValue[1] !== max ? finalValue[1] : undefined;
    }

    dispatch(setFilter(filterUpdate));
  };

  const formatValue = (val) => {
    if (purpose === "rate") {
      return val % 1 === 0 ? val.toString() : val.toFixed(1);
    }
    return val.toString();
  };

  return (
    <Box sx={{ width: "100%", px: 1 }}>
      <Typography id="range-slider">
        {title}: {formatValue(value[0])} - {formatValue(value[1])}
      </Typography>
      <Slider
        getAriaLabel={() => `${title} range`}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => valuetext(value, purpose)}
        valueLabelFormat={formatValue}
        sx={{
          color: "primary.main",
          "& .MuiSlider-thumb": {
            width: 20,
            height: 20,
          },
          "& .MuiSlider-valueLabel": {
            fontSize: 12,
          },
        }}
      />
    </Box>
  );
}
