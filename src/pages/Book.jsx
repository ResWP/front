import { useState } from "react";
import {
	Box,
	Typography,
	Button,
	Modal,
	TextField,
	Slider,
	useMediaQuery,
} from "@mui/material";

const Book = () => {
	const [openModal, setOpenModal] = useState(false);
	const [rating, setRating] = useState(null);
	const [comment, setComment] = useState("");
	const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	const handleModalOpen = () => setOpenModal(true);
	const handleModalClose = () => setOpenModal(false);

	const handleSave = () => {
		setOpenModal(false);
	};

	return (
		<Box
			sx={(theme) => ({
				display: "flex",
				flexDirection: isSmallScreen ? "column" : "row",
				alignItems: isSmallScreen ? "center" : "flex-start",
				padding: 4,
				gap: 3,
				borderRadius: 4,
				backgroundColor: theme.palette.background.paper,
				boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
			})}
		>
			{/* Book Image */}
			<Box
				component="img"
				src="http://images.amazon.com/images/P/1558746218.01.LZZZZZZZ.jpg"
				alt="Book Cover"
				sx={{
					width: isSmallScreen ? "100%" : "40%",
					maxWidth: "400px",
					height: "auto",
					borderRadius: 2,
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
				}}
			/>
			{/* Text Content */}
			<Box
				sx={{
					width: isSmallScreen ? "min(400px, 100%)" : "60%",
					marginInline: "auto",
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<Typography variant="h4" fontSize={{ xs: 24, sm: 28, md: 32 }}>
					Title
				</Typography>
				<Typography
					variant="body1"
					color="text.secondary"
					fontSize={{ xs: 16, md: 18 }}
				>
					<b>Author:</b> John Doe | <b>Publisher:</b> Penguin Books |{" "}
					<b>Year:</b> 2025
				</Typography>

				<Box sx={{ mt: 2 }}>
					<Typography variant="h6" gutterBottom fontSize={{ xs: 16, md: 18 }}>
						Rating: <b>{rating || "Not Rated"}</b>
					</Typography>
					{comment && (
						<Typography
							variant="body2"
							fontSize={{ xs: 16, md: 18 }}
							sx={{
								fontStyle: "italic",
								backgroundColor: "rgba(0, 0, 0, 0.05)",
								padding: 1,
								borderRadius: 2,
							}}
						>
							&ldquo;{comment}&rdquo;
						</Typography>
					)}
				</Box>
				<Button
					variant="contained"
					color="primary"
					onClick={handleModalOpen}
					sx={{ mt: 2, alignSelf: "flex-start", padding: "10px 20px" }}
				>
					Rate and Comment
				</Button>
			</Box>

			{/* Modal for Rating and Comment */}
			<Modal open={openModal} onClose={handleModalClose}>
				<Box
					sx={(theme) => ({
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "min(400px, 90%)",
						bgcolor: theme.palette.background.paper,
						border: "none",
						boxShadow: 24,
						p: 4,
						borderRadius: "12px",
					})}
				>
					<Typography variant="h5" gutterBottom color="text.primary">
						Rate and Comment
					</Typography>
					<Typography gutterBottom color="text.secondary">
						Rating (1 to 10):
					</Typography>
					<Slider
						value={rating || 0}
						min={1}
						max={10}
						step={1}
						onChange={(e, newValue) => setRating(newValue)}
						marks
						valueLabelDisplay="auto"
						sx={{
							color: "primary.main",
						}}
					/>
					<TextField
						label="Comment"
						variant="outlined"
						fullWidth
						multiline
						rows={3}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						sx={{ mt: 3 }}
					/>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: "20px",
						}}
					>
						<Button
							onClick={handleModalClose}
							color="error"
							variant="outlined"
							sx={{
								padding: "10px 20px",
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							variant="contained"
							color="primary"
							sx={{
								padding: "10px 20px",
							}}
						>
							Save
						</Button>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};

export default Book;
