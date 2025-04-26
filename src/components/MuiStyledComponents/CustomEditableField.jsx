import { Box, TextField, Typography } from "@mui/material";

const CustomEditableField = ({
	icon: Icon,
	value,
	name,
	isEditing,
	setIsEditing,
	handleChange,
	handleBlur,
	handleUpdate,
	error,
	touched,
	placeholder,
	sx,
	iconStyle,
}) => (
	<Box sx={{ display: "flex", alignItems: "center", ...sx }}>
		<Icon style={iconStyle} />
		{isEditing ? (
			<TextField
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={(e) => {
					handleBlur(e);
					if (!error) {
						setIsEditing(false);
						handleUpdate(name, value);
					}
				}}
				autoFocus
				size="small"
				error={touched && Boolean(error)}
				helperText={touched && error}
				placeholder={placeholder}
			/>
		) : (
			<Typography
				sx={{ fontWeight: 500, cursor: "pointer" }}
				onDoubleClick={() => setIsEditing(true)}
			>
				{value}
			</Typography>
		)}
	</Box>
);

export default CustomEditableField;
