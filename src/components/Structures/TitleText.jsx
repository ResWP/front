import { Typography } from "@mui/material";

export const PageTitle = ({ children }) => {
	return (
		<Typography
			variant="h4"
			fontSize={{ xs: 24, md: 32 }}
			as="h1"
			mt={{ xs: 1, md: 3 }}
			mb={1}
		>
			{children}
		</Typography>
	);
};

export const SubTitle = ({ children }) => {
	return (
		<Typography variant="body1" color="text.secondary" mb={2}>
			{children}
		</Typography>
	);
};
