import { createTheme } from "@mui/material";

const Theme = createTheme({
	palette: {
		primary: {
			main: "#F7C8E0",
			contrastText: "#5D3A4E",
		},
		secondary: {
			main: "#FFD1BA",
			contrastText: "#5D3A4E",
		},
		error: {
			main: "#FF6F61",
		},
		background: {
			default: "#FFF8F0",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#5D3A4E",
			secondary: "#B48A78",
		},
	},
	typography: {
		fontFamily: "'Poppins', sans-serif", // Clean, modern, and soft font
		h1: {
			fontSize: "2.5rem",
			fontWeight: 600,
			color: "#5D3A4E",
		},
		h2: {
			fontSize: "2rem",
			fontWeight: 500,
			color: "#5D3A4E",
		},
		body1: {
			fontSize: "1rem",
			fontWeight: 400,
			color: "#5D3A4E",
		},
		body2: {
			fontSize: "0.875rem",
			fontWeight: 400,
			color: "#B48A78",
		},
	},
});
document.documentElement.style.setProperty(
	"--contrast-text",
	Theme.palette.contrastText
);

export default Theme;
