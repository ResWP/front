import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import css from "./styles.module.css";
import Navigation from "./Navigation";

const DrawerComponent = ({ auth }) => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<>
			<IconButton onClick={toggleDrawer(true)}>
				<IoIosMenu
					className={css.icon}
					style={{
						fill: "#fff",
					}}
				/>
			</IconButton>
			<Drawer
				open={open}
				anchor="right"
				className={css.drawer}
				onClose={toggleDrawer(false)}
			>
				<IconButton onClick={toggleDrawer(false)} className={css.close}>
					<IoCloseOutline className={css.icon} />
				</IconButton>
				<Navigation auth={auth} toggleDrawer={toggleDrawer} />
			</Drawer>
		</>
	);
};

export default DrawerComponent;
