import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Structures/Layout";
import React from "react";
import PrivateRoute from "./components/routes/PrivateRoute";
import RestrictedRoute from "./components/routes/RestrictedRoute";

const HomePage = React.lazy(() => import("./pages/Home"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Book = React.lazy(() => import("./pages/Book"));
const Library = React.lazy(() => import("./pages/Library"));
const Rated = React.lazy(() => import("./pages/Rated"));

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/register"
					element={
						<RestrictedRoute redirectTo="/books" component={<Register />} />
					}
				/>
				<Route
					path="/login"
					element={
						<RestrictedRoute redirectTo="/books" component={<Login />} />
					}
				/>
				<Route
					path="/ratings"
					element={<PrivateRoute redirectTo="/login" component={<Rated />} />}
				/>
				<Route path="/books/:booksId" element={<Book />} />
				<Route path="/books" element={<Library />} />
			</Routes>
		</Layout>
	);
}

export default App;
