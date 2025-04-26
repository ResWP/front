import { Box, useTheme } from "@mui/material";

const ScrollableRow = ({ isSmall, children }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: "flex",
				overflowX: "auto",
				gap: 3,
				paddingBlock: isSmall ? 2 : 3,
				paddingInline: 2,
				scrollbarWidth: "thin",
				scrollbarColor: `${theme.palette.secondary.main} ${theme.palette.grey[300]}`,
				borderRadius: 4,
				"&::-webkit-scrollbar": {
					height: "6px",
				},
				"&::-webkit-scrollbar-track": {
					background: theme.palette.grey[300],
					borderRadius: 3,
				},
				"&::-webkit-scrollbar-thumb": {
					background: theme.palette.primary.light,
					borderRadius: 3,
				},
				"&::-webkit-scrollbar-thumb:hover": {
					background: theme.palette.primary.dark,
				},
			}}
		>
			{children}
		</Box>
	);
};

export default ScrollableRow;
