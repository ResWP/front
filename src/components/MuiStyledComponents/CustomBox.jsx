import Box from "@mui/material/Box";

const CustomBox = ({
	width = "100%",
	maxWidth = 800,
	mt = 3,
	p = 2,
	boxShadow = 1,
	borderRadius = 2,
	bgcolor = "background.paper",
	children,
	...rest
}) => (
	<Box
		sx={{
			minWidth: 300,
			width: width,
			maxWidth: maxWidth,
			mt: mt,
			p: p,
			bgcolor: bgcolor,
			boxShadow: boxShadow,
			borderRadius: borderRadius,
			mx: "auto",
			...rest,
		}}
	>
		{children}
	</Box>
);

export default CustomBox;
