import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Formik, Form } from "formik";
import { Button, Typography } from "@mui/material";
import { Field, Box } from "../MuiStyledComponents";
import { toast } from "react-hot-toast";
import { loginValidationSchema } from "../../services/validationSchemas";

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = loginValidationSchema;

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success("Login successful");
        resetForm();
      })
      .catch(() => {
        toast.error("Login failed. Please check your credentials.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box p={3} boxShadow={3} maxWidth={400}>
      <Typography variant="h5" component="h1" textAlign="center" mb={2}>
        Увійти
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form autoComplete="off">
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
              {isSubmitting ? "Logging In..." : "Log In"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
