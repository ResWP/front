import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import DrawerComponent from "./Drawer";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
// import Demo from "./Demo";

const Header = () => {
  const wideScreen = useMediaQuery("(min-width:850px)");

  return (
    <>
      <AppBar position="sticky" component={"header"}>
        <Toolbar>
          <Typography
            variant="h5"
            className="title"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: "0.1em",
              fontSize: { xs: 24, sm: 28, md: 32 },
            }}
          >
            <Link to="/">LitPix</Link>
          </Typography>
          {/* {wideScreen && <Demo isWide={wideScreen} />} */}

          {wideScreen ? (
            <Navigation isWide={wideScreen} />
          ) : (
            <DrawerComponent />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
