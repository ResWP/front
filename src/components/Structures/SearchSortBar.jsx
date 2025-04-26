const SortListContainer = ({ isSmall, children }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: isSmall && "column",
				gap: 12,
			}}
		>
			{children}
		</div>
	);
};

export default SortListContainer;
