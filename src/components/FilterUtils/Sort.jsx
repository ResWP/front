import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";

  const handleChangeSortby = (event) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortby: event.target.value,
    });
  };

  const handleChangeOrder = (event) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      order: event.target.value,
    });
  };

  return (
    <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
      <FormControl
        sx={{
          m: 0,
          minWidth: 100,
          alignContent: "center",
          width: "100%",
        }}
      >
        <InputLabel id="select-sort-by-label">Сортувати за</InputLabel>
        <Select
          labelId="select-sort-by-label"
          id="select-sort-by"
          value={sortby}
          onChange={handleChangeSortby}
          autoWidth
          label="Сортувати за"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"bookTitle"}>Назва</MenuItem>
          <MenuItem value={"bookAuthor"}>Автор</MenuItem>
          <MenuItem value={"publisher"}>Видавництво</MenuItem>
          <MenuItem value={"yearOfPublication"}>Рік</MenuItem>
          <MenuItem value={"avgRating"}>Оцінка</MenuItem>
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
        <InputLabel id="select-order-label">Порядок</InputLabel>
        <Select
          labelId="select-order-label"
          id="select-order"
          value={order}
          onChange={handleChangeOrder}
          autoWidth
          label="Порядок"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"asc"}>Висхідний</MenuItem>
          <MenuItem value={"desc"}>Нисхідний</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
