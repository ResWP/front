import { Grid2 } from "@mui/material";

const CustomGrid = ({ children, ...rest }) => (
	<Grid2 container spacing={3} sx={{ justifyContent: "center" }} {...rest}>
		<Grid2
			xs={12}
			md={6}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2, // Space between children
			}}
		>
			{children[0]}
			{children[1]}
		</Grid2>

		<Grid2 xs={12} md={6}>
			{children[2]}
		</Grid2>
	</Grid2>
);

export default CustomGrid;
