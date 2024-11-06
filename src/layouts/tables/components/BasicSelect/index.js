import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

function SelectSmall({ optionChange }) {
  const [tipo, setTipo] = React.useState("");
  const handleChange = (event) => {
    setTipo(event.target.value);
    optionChange(event.target.value);
  };

  const inputLabelStyles = {
    fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const selectStyles = {
    fontSize: tipo
      ? { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" }
      : { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
    color: tipo ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s, box-shadow 0.3s, border-color 0.3s",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFFFFF",
    },
    "& .MuiSelect-icon": {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.25)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.25)",
    },
  };

  const menuItemStyles = {
    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
    color: "#333",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  };

  // Mapeo de valores a sus etiquetas
  const tipoLabels = {
    10: "Criptomonedas",
    20: "NASDAQ",
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: { xs: 60, sm: 100, md: 100 },
        marginLeft: { xs: 13, sm: 30, md: 95 },
      }}
      size="small"
    >
      {!tipo && (
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
      )}
      <Select
        labelId="tipo-select-label"
        value={tipo}
        displayEmpty
        onChange={handleChange}
        sx={selectStyles}
        renderValue={(selected) => {
          return selected ? (
            <span style={{ fontSize: "1.2rem", color: "#FFFFFF" }}> {tipoLabels[selected]}</span>
          ) : (
            ""
          );
        }}
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

SelectSmall.propTypes = {
  optionChange: PropTypes.func.isRequired,
};

export default SelectSmall;
