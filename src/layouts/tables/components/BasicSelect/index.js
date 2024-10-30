import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall() {
  const [tipo, setTipo] = React.useState("");

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const inputLabelStyles = {
    fontSize: "2rem",
    color: "rgba(255, 255, 255, 0.8)",
  };

  const selectStyles = {
    fontSize: "1.2rem",
    color: "#FFFFFF",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 1)",
    },
    "& .MuiSvgIcon-root": {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "1.5rem",
    },
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
  };

  const menuItemStyles = {
    fontSize: "1.2rem",
    color: "#333333",
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 110, marginLeft: 90 }} size="small">
      <InputLabel id="tipo-select-label" sx={inputLabelStyles}>
        Tipo
      </InputLabel>
      <Select
        labelId="tipo-select-label"
        value={tipo}
        label="Tipo"
        onChange={handleChange}
        sx={selectStyles}
      >
        <MenuItem value={10} sx={menuItemStyles}>
          Criptomonedas
        </MenuItem>
        <MenuItem value={20} sx={menuItemStyles}>
          NASDAQ
        </MenuItem>
      </Select>
    </FormControl>
  );
}
