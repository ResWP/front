import { Box, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../redux/auth/slice";
import { selectUser } from "../../redux/auth/selectors";

export const Demo = ({ isWide }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [age, setAge] = useState(user.age ?? "");
  const [location, setLocation] = useState(user.location ?? "");

  const cities = [
    { label: "Київ", value: "kyiv" },
    { label: "Львів", value: "lviv" },
    { label: "Одеса", value: "odesa" },
    { label: "Харків", value: "kharkiv" },
    { label: "Дніпро", value: "dnipro" },
    { label: "Запоріжжя", value: "zaporizhzhia" },
    { label: "Івано-Франківськ", value: "ivano-frankivsk" },
    { label: "Тернопіль", value: "ternopil" },
    { label: "Чернівці", value: "chernivtsi" },
    { label: "Ужгород", value: "uzhhorod" },
  ];

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && Number(value) < 120)) {
      setAge(value);
      dispatch(setUserDetails({ age: value }));
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    dispatch(setUserDetails({ location: value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        paddingInline: 3,
        marginInline: "auto",
        flexDirection: !isWide ? "column" : "row",
        alignItems: "center",
        marginBlock: "auto",
      }}
    >
      <TextField
        label="Вік"
        variant="outlined"
        size="small"
        value={age}
        onChange={handleAgeChange}
        type="number"
        sx={{ width: 80 }}
      />
      <TextField
        select
        label="Місто"
        variant="outlined"
        size="small"
        value={location}
        onChange={handleLocationChange}
        sx={{ minWidth: 150, maxWidth: 300 }}
      >
        {cities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Demo;
