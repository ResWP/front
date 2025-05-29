import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import Navigation from "./Navigation";
import css from "./styles.module.css";
// import Demo from "./Demo";

const DrawerComponent = () => {
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
        <Navigation toggleDrawer={toggleDrawer} />
        {/* <Demo /> */}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
