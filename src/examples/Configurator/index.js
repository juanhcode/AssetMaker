import { useState, useEffect } from "react";
import { Divider, Switch, IconButton, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import {
  useMaterialUIController,
  setOpenConfigurator,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

const sidenavButtonStyles = (darkMode, background, white, borderWidth) => ({
  height: "39px",
  background: darkMode ? background.sidenav : white.main,
  color: darkMode ? white.main : "dark.main",
  border: `${borderWidth[1]} solid ${darkMode ? white.main : "dark.main"}`,
  "&:hover, &:focus, &:focus:not(:hover)": {
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : "dark.main",
  },
});

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, fixedNavbar, sidenavColor, darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDisabled(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h3">Configurador</MDTypography>
          <MDTypography variant="h5" color="text">
            Vea nuestras opciones de panel de control.
          </MDTypography>
        </MDBox>
        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>
      <Divider />
      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h5">Colores del Sidenav</MDTypography>
          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={(theme) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `1px solid ${theme.palette.white.main}`,
                  transition: theme.transitions.create("border-color", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.shorter,
                  }),
                  backgroundImage: theme.functions.linearGradient(
                    theme.palette.gradients[color].main,
                    theme.palette.gradients[color].state
                  ),
                  "&:not(:last-child)": { mr: 1 },
                  "&:hover, &:focus, &:active": {
                    borderColor: theme.palette.white.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant="h5">Barra de navegación fija</MDTypography>
          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h5">Claro / Oscuro</MDTypography>
          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
