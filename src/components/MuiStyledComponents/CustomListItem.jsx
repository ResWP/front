import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CustomListItem = ({ text, iconColor = "primary" }) => (
	<ListItem sx={{ p: 0, width: "fit-content" }}>
		<ListItemIcon sx={{ minWidth: 32, marginBlock: "auto" }}>
			<CheckCircleIcon color={iconColor} />
		</ListItemIcon>
		<ListItemText primary={text} />
	</ListItem>
);

export default CustomListItem;
