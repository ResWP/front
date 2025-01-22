import * as Yup from "yup";

const phoneRegex = /^\d{3}-\d{2}-\d{2}$/;

export const contactValidationSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Name must be at least 3 characters")
		.max(50, "Name must be 50 characters or less")
		.required("Name is required"),
	number: Yup.string()
		.matches(phoneRegex, "Invalid phone number (format: 123-45-67)")
		.required("Phone number is required"),
});

export const loginValidationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long")
		.required("Password is required"),
});

export const registerValidationSchema = Yup.object()
	.shape({
		name: Yup.string()
			.min(3, "Username must be at least 3 characters long")
			.required("Username is required"),
	})
	.concat(loginValidationSchema);
