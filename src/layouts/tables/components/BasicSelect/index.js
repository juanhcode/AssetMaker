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
  };

  const selectStyles = {
    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 1)",
    },
    "& .MuiSelect-icon": {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
    },
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
    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
    color: "dark",
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

SelectSmall.propTypes = {
  optionChange: PropTypes.func.isRequired,
};

export default SelectSmall;
