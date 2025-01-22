import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@emotion/react";
import "./index.css";
import "modern-normalize";
import App from "./App.jsx";
import Theme from "./components/Theme.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={Theme}>
				<Toaster position="bottom-left" />
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
