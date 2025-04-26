import { Box, Button, TextField } from "@mui/material";
import RangeSlider from "./RangeSlider";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const FilterBox = ({ isWide }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [author, setAuthor] = useState(searchParams.get("author") || "");
	const [publisher, setPublisher] = useState(
		searchParams.get("publisher") || ""
	);

	const handleFilter = () => {
		const newParams = { ...Object.fromEntries(searchParams) };
		if (author) {
			newParams.author = author;
		} else {
			delete newParams.author;
		}
		if (publisher) {
			newParams.publisher = publisher;
		} else {
			delete newParams.publisher;
		}
		setSearchParams(newParams);
	};

	return (
		<Box
			width={"100%"}
			maxWidth={isWide ? 320 : "100%"}
			maxHeight={450}
			p={3}
			bgcolor={"background.paper"}
			boxShadow={3}
			display="grid"
		>
			<TextField
				id="filled-basic-author"
				label="Автор"
				variant="standard"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				sx={{ width: "100%" }}
			/>
			<TextField
				id="filled-basic-pub"
				label="Видавництво"
				variant="standard"
				value={publisher}
				onChange={(e) => setPublisher(e.target.value)}
				sx={{ width: "100%", marginBlock: 2 }}
			/>
			<RangeSlider purpose={"rate"} title={"Рейтинг:"} min={0} max={10} />
			<RangeSlider purpose={"date"} title={"Рік:"} min={1995} max={2010} />
			<Button variant="contained" sx={{ width: "100%" }} onClick={handleFilter}>
				Фільтр
			</Button>
		</Box>
	);
};

export default FilterBox;
