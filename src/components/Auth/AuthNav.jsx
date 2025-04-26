import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const AuthNav = ({ isWide }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, flexDirection: isWide ?? "column" }}>
      <Button component={NavLink} to="/register">
        Зареєструватись
      </Button>
      <Button component={NavLink} to="/login">
        Увійти
      </Button>
    </Box>
  );
};

export default AuthNav;
