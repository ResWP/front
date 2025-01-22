import { NavLink } from "react-router-dom";
import css from "./styles.module.css";
import { Button } from "@mui/material";

const Navigation = ({ auth, toggleDrawer = function () {} }) => {
	return (
		<nav>
			<ul className={css.navigationList}>
				<li>
					<Button component={NavLink} to="/" onClick={toggleDrawer(false)}>
						Home
					</Button>
				</li>
				<li>
					<Button component={NavLink} to="/books" onClick={toggleDrawer(false)}>
						Library
					</Button>
				</li>
				{auth && (
					<li>
						<Button
							component={NavLink}
							to="/ratings"
							onClick={toggleDrawer(false)}
						>
							Rated
						</Button>
					</li>
				)}
				{!auth && (
					<>
						<li>
							<Button
								component={NavLink}
								to="/login"
								onClick={toggleDrawer(false)}
							>
								Login
							</Button>
						</li>
						<li>
							<Button
								component={NavLink}
								to="/register"
								onClick={toggleDrawer(false)}
							>
								Register
							</Button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
