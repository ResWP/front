import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { Button, Typography, Box } from "@mui/material";
import { toast } from "react-hot-toast";
import FormField from "./FilterUtils/FormField";
import {
	loginValidationSchema,
	registerValidationSchema,
} from "../services/validationSchemas";

const LoginForm = () => {
	const dispatch = useDispatch();

	const handleLogin = async (values, { setSubmitting, resetForm }) => {
		try {
			await dispatch(login(values)).unwrap();
			toast.success("Login successful");
			resetForm();
		} catch {
			toast.error("Login failed. Please check your credentials.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Box p={3} boxShadow={3}>
			<Typography variant="h5" align="center" gutterBottom>
				Log In
			</Typography>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={loginValidationSchema}
				onSubmit={handleLogin}
			>
				{({ isSubmitting }) => (
					<Form autoComplete="off">
						<FormField name="email" label="Email" type="email" />
						<FormField
							name="password"
							label="Password"
							type="password"
							autoComplete="new-password"
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							disabled={isSubmitting}
							sx={{ mt: 2 }}
						>
							{isSubmitting ? "Logging In..." : "Log In"}
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const RegisterForm = () => {
	const dispatch = useDispatch();

	const handleRegister = async (values, { setSubmitting, resetForm }) => {
		try {
			await dispatch(register(values)).unwrap();
			toast.success("Registration successful");
			resetForm();
		} catch {
			toast.error(
				"Registration failed, user with this email is already registered"
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Box p={3} boxShadow={3}>
			<Typography variant="h5" align="center" gutterBottom>
				Register
			</Typography>
			<Formik
				initialValues={{ name: "", email: "", password: "" }}
				validationSchema={registerValidationSchema}
				onSubmit={handleRegister}
			>
				{({ isSubmitting }) => (
					<Form autoComplete="off">
						<FormField name="name" label="Username" />
						<FormField name="email" label="Email" type="email" />
						<FormField
							name="password"
							label="Password"
							type="password"
							autoComplete="new-password"
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							disabled={isSubmitting}
							sx={{ mt: 2 }}
						>
							{isSubmitting ? "Registering..." : "Register"}
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export { LoginForm, RegisterForm };
