import { Field } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CustomField = ({
  name,
  label,
  type = "text",
  autoComplete = "off",
  variant = "outlined",
  fullWidth = true,
  touched,
  errors,
}) => (
  <Box mb={2}>
    <Field
      name={name}
      as={TextField}
      label={label}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
    />
  </Box>
);

export default CustomField;
