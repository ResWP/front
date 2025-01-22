import { TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import css from "./styles.module.css";

const SearchBar = () => {
	return (
		<div style={{ position: "relative", width: "100%" }}>
			<TextField
				variant="outlined"
				fullWidth
				placeholder="Search..."
				// onChange={(e) => handleFilterChange(e.target.value)}
				sx={{
					borderRadius: 2,
					backgroundColor: "Background",
					height: "fit-content",
					"& .MuiOutlinedInput-root": {
						borderRadius: 2,
					},
				}}
			/>
			<CiSearch className={css.searchIcon} />
		</div>
	);
};

export default SearchBar;
