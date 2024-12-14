import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import logo from "assets/images/Logo.png";
import GlobalStyle from "../src/assets/styles/GlobalStyle";
import PropTypes from "prop-types";

const getRoutes = (allRoutes) =>
  allRoutes.flatMap((route) =>
    route.collapse
      ? getRoutes(route.collapse)
      : route.route
      ? [<Route exact path={route.route} element={route.component} key={route.key} />]
      : []
  );

const ConfiguratorButton = ({ onClick }) => (
  <MDBox
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="3.25rem"
    height="3.25rem"
    bgColor="white"
    shadow="sm"
    borderRadius="50%"
    position="fixed"
    right="2rem"
    bottom="2rem"
    zIndex={99}
    color="dark"
    sx={{ cursor: "pointer" }}
    onClick={onClick}
  >
    <Icon fontSize="small" color="inherit">
      settings
    </Icon>
  </MDBox>
);

ConfiguratorButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, openConfigurator, sidenavColor, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const handleMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const excludedRoutes = ["/", "/login", "/register"];
  const showSidenav = !excludedRoutes.includes(pathname.toLowerCase());

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <GlobalStyle />
      <CssBaseline />
      {showSidenav && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brandName={
              <span
                style={{
                  color: "#ffd700",
                  fontSize: "20px",
                  marginLeft: "-10px",
                }}
              >
                AssetMaker
              </span>
            }
            routes={routes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              "& .MuiSidenav-brand": {
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              },
            }}
          />
          <Configurator />
          <ConfiguratorButton onClick={handleConfiguratorOpen} />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
