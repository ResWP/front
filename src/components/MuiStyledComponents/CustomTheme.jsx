import { createTheme } from "@mui/material";

const customTheme = createTheme({
	palette: {
		primary: {
			main: "#12100E",
			contrastText: "#F5F5F5",
		},
		error: {
			main: "#d32f2f",
		},
		background: {
			default: "#F5F5F5",
			paper: "#ffffff",
		},
		text: {
			primary: "#212121",
			secondary: "#757575",
		},
	},
});

export default customTheme;
