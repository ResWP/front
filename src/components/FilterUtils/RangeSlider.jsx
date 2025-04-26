import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function valuetext(value) {
  return `${value}🌟`;
}

export default function RangeSlider({ purpose, title, min, max }) {
  const [value, setValue] = React.useState([min, max]);
  const [activeHandle, setActiveHandle] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event, newValue, activeThumb) => {
    // Determine which handle is being moved
    if (activeThumb === 0) {
      // Min handle is being moved - keep max fixed
      setValue([newValue[0], value[1]]);
      setActiveHandle("min");
    } else {
      // Max handle is being moved - keep min fixed
      setValue([value[0], newValue[1]]);
      setActiveHandle("max");
    }
  };

  const handleChangeCommitted = (event, finalValue) => {
    const newParams = { ...Object.fromEntries(searchParams) };

    if (activeHandle === "min") {
      if (finalValue[0] !== min) {
        newParams[purpose.toLowerCase() + "Min"] = finalValue[0];
        delete newParams[purpose.toLowerCase() + "Max"];
      } else {
        delete newParams[purpose.toLowerCase() + "Min"];
      }
    } else if (activeHandle === "max") {
      if (finalValue[1] !== max) {
        newParams[purpose.toLowerCase() + "Max"] = finalValue[1];
        delete newParams[purpose.toLowerCase() + "Min"];
      } else {
        delete newParams[purpose.toLowerCase() + "Max"];
      }
    }

    setSearchParams(newParams);
    setActiveHandle(null); // Reset active handle after commit
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography id="input-slider" gutterBottom>
        {title}:
      </Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        min={min}
        max={max}
        marks
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{ textAlign: "center" }}
      />
    </Box>
  );
}
