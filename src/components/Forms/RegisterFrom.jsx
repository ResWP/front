import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { Box, Field } from "../MuiStyledComponents";
import { toast } from "react-hot-toast";
import { registerValidationSchema } from "../../services/validationSchemas";

export const RegisterForm = () => {
	const dispatch = useDispatch();

	const validationSchema = registerValidationSchema;

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		dispatch(register(values))
			.unwrap()
			.then(() => {
				toast.success("Registration successful");
				resetForm();
			})
			.catch((e) => {
				console.log(e);
				toast.error(
					"Registration failed, user with this email is already registered"
				);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	return (
		<Box p={3} boxShadow={3} maxWidth={400}>
			<Typography variant="h5" component="h1" textAlign="center" mb={2}>
				Register
			</Typography>

			<Formik
				initialValues={{ name: "", email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form autoComplete="off">
						<Field
							name="name"
							label="Username"
							touched={touched}
							errors={errors}
						/>
						<Field
							name="email"
							label="Email"
							type="email"
							touched={touched}
							errors={errors}
						/>
						<Field
							name="password"
							label="Password"
							type="password"
							autoComplete="new-password"
							touched={touched}
							errors={errors}
						/>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							disabled={isSubmitting}
							sx={{ mt: 2 }}
						>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
