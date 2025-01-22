import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Sort = ({ isSmall }) => {
	const [sortby, setSortby] = React.useState("");
	const [order, setOrder] = React.useState("");

	const handleChangeSortby = (event) => {
		setSortby(event.target.value);
	};

	const handleChangeOrder = (event) => {
		setOrder(event.target.value);
	};

	return (
		<div style={{ display: "flex", gap: 12 }}>
			<FormControl
				sx={{
					m: 0,
					minWidth: 100,
					alignContent: "center",
					width: isSmall && "100%",
				}}
			>
				<InputLabel id="select-sort-by-label">Sort by</InputLabel>
				<Select
					labelId="select-sort-by-label"
					id="select-sort-by"
					value={sortby}
					onChange={handleChangeSortby}
					autoWidth
					label="Sort by"
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={"title"}>Title</MenuItem>
					<MenuItem value={"author"}>Author</MenuItem>
					<MenuItem value={"publisher"}>Publisher</MenuItem>
					<MenuItem value={"year"}>Year</MenuItem>
					<MenuItem value={"avgrating"}>Rating</MenuItem>
				</Select>
			</FormControl>
			<FormControl
				sx={{
					m: 0,
					minWidth: 100,
					alignContent: "center",
					display: "flex",
				}}
			>
				<InputLabel id="select-order-label">Order</InputLabel>
				<Select
					labelId="select-order-label"
					id="select-order"
					value={order}
					onChange={handleChangeOrder}
					autoWidth
					label="order"
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={"asc"}>ASC</MenuItem>
					<MenuItem value={"desc"}>DESC</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default Sort;
