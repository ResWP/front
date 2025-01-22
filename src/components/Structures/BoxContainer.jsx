import Box from "@mui/material/Box";

const BoxContainer = ({
	width = "100%",
	maxWidth = 400,
	mt = 3,
	p = 3,
	bgcolor = "background.paper",
	boxShadow = 3,
	borderRadius = 2,
	children,
	...rest
}) => (
	<Box
		sx={{
			minWidth: "min(320px, 100%)",
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

export default BoxContainer;
