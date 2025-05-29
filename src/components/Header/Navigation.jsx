import { NavLink } from "react-router-dom";
import css from "./styles.module.css";
import { Button } from "@mui/material";
import AuthNav from "../Auth/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const Navigation = ({ toggleDrawer = function () {}, isWide }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  return (
    <nav>
      <ul className={css.navigationList}>
        <li>
          <Button component={NavLink} to="/books" onClick={toggleDrawer(false)}>
            Бібліотека
          </Button>
        </li>
        <li>
          {isLoggedIn ? (
            <>
              <Button
                component={NavLink}
                to="/ratings"
                onClick={toggleDrawer(false)}
              >
                Оцінки
              </Button>
              <Button
                component={NavLink}
                to="/login"
                onClick={() => dispatch(logout())}
              >
                Вийти
              </Button>
            </>
          ) : (
            <AuthNav isWide={isWide} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
