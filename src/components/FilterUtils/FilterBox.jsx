import { Box, Button, TextField } from "@mui/material";
import RangeSlider from "./RangeSlider";

const FilterBox = ({ isWide }) => {
	return (
		<Box
			width={"100%"}
			maxWidth={isWide ? 320 : "100%"}
			maxHeight={450}
			mt={3}
			p={3}
			bgcolor={"background.paper"}
			boxShadow={3}
			display="grid"
		>
			<TextField
				id="filled-basic"
				label="Author"
				variant="standard"
				sx={{ width: "100%" }}
			/>
			<TextField
				id="filled-basic"
				label="Publisher"
				variant="standard"
				sx={{ width: "100%", marginBlock: 2 }}
			/>
			<RangeSlider purpose={"Rating"} min={0} max={10} />
			<RangeSlider purpose={"Year"} min={1995} max={2010} />
			<Button variant="contained" sx={{ width: "100%" }}>
				Filter
			</Button>
		</Box>
	);
};

export default FilterBox;
