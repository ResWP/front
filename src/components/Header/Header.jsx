import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import DrawerComponent from "./Drawer";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header = () => {
	const auth = false;
	const wideScreen = useMediaQuery("(min-width:600px)");

	return (
		<>
			<AppBar as="header" position="sticky">
				<Toolbar>
					<Typography
						variant="h5"
						className="title"
						sx={{
							flexGrow: 1,
							fontWeight: 600,
							letterSpacing: "0.1em",
							fontSize: 24,
						}}
					>
						<Link to="/">LitPix</Link>
					</Typography>
					{wideScreen ? (
						<Navigation auth={auth} />
					) : (
						<DrawerComponent auth={auth} />
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;
