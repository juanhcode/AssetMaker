import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

SelectSmall.propTypes = {
  optionChange: PropTypes.func.isRequired,
};

export default function SelectSmall({ optionChange }) {
  const [tipo, setTipo] = React.useState("");
  const handleChange = (event) => {
    optionChange(event.target.value);
  };

  const inputLabelStyles = {
    fontSize: "1.8rem",
    color: "#FFFFFF",
  };

  const selectStyles = {
    fontSize: "1.4rem",
    color: "#FFFFFF",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 1)",
    },
    "& .MuiSelect-icon": {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "1.5rem",
    },
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-expanded": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  };

  const menuItemStyles = {
    fontSize: "1.4rem",
    color: "#333333",
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100, marginLeft: 90 }} size="small">
      <InputLabel
        id="tipo-select-label"
        sx={{
          ...inputLabelStyles,
          top: "-4px",
          left: "8px",
          transform: "scale(1)",
        }}
      >
        Tipo
      </InputLabel>
      <Select
        labelId="tipo-select-label"
        value={tipo}
        defaultValue={10}
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
