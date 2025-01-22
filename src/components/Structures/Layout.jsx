import { Suspense } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import Header from "../Header/Header";

const Layout = ({ children }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				bgcolor: "background.default",
				color: "text.primary",
			}}
		>
			<Header />
			<Suspense
				fallback={
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexGrow: 1,
							minHeight: "calc(100vh - 64px)",
						}}
					>
						<CircularProgress />
					</Box>
				}
			>
				<Container
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						flexGrow: 1,
						py: 2,
						maxWidth: 1320,
						gap: 2,
					}}
					component="section"
				>
					{children}
				</Container>
			</Suspense>
		</Box>
	);
};

export default Layout;
