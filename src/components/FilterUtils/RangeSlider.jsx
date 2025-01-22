import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value) {
	return `${value}🌟`;
}

export default function RangeSlider({ purpose, min, max }) {
	const [value, setValue] = React.useState([min, max]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Typography id="input-slider" gutterBottom>
				{purpose}:
			</Typography>
			<Slider
				getAriaLabel={() => "Temperature range"}
				value={value}
				min={min}
				max={max}
				marks
				onChange={handleChange}
				valueLabelDisplay="auto"
				getAriaValueText={valuetext}
				sx={{ textAlign: "center" }}
			/>
		</Box>
	);
}
