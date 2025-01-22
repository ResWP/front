import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
	const isLoggedIn = true;

	return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
