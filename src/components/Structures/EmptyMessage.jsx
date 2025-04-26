import { Typography, useTheme } from "@mui/material";
import { SiCodemirror } from "react-icons/si";

const EmptyMessage = ({ children }) => {
	const theme = useTheme();

	return (
		<Typography
			variant="h5"
			p={3}
			borderRadius={3}
			color="primary.contrastText"
			sx={{
				fontSize: { xs: 18, sm: 24 },
				width: "100%",
				height: "fit-content",
				background: theme.palette.secondary.main,
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			{children}
			<SiCodemirror style={{ width: 32, height: 32, flexShrink: 0 }} />
		</Typography>
	);
};

export default EmptyMessage;
