import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Menu, MenuItem, FormControl, Box } from "@mui/material";

function SelectSmall({ optionChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("criptomonedas");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) {
      setSelectedOption(option);
      optionChange(option);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <FormControl>
        <Button
          onClick={handleClick}
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            color: "#1A73E8",
            backgroundColor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#FFFFFF",
              color: "#1558B0",
            },
          }}
        >
          {selectedOption === "criptomonedas" ? "Criptomonedas" : "NASDAQ"}
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
          <MenuItem onClick={() => handleClose("criptomonedas")}>Criptomonedas</MenuItem>
          <MenuItem onClick={() => handleClose("nasdaq")}>NASDAQ</MenuItem>
        </Menu>
      </FormControl>
    </Box>
  );
}

SelectSmall.propTypes = {
  optionChange: PropTypes.func.isRequired,
};

export default SelectSmall;
