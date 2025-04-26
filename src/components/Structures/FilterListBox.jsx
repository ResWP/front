import { Box } from "@mui/material";

const FilterListBox = ({ isWide, children }) => {
	return (
		<Box mt={3} sx={{ display: isWide && "flex", gap: 3 }}>
			{children}
		</Box>
	);
};

export default FilterListBox;
