import React from "react";
import { Typography, Icon } from "@mui/material";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import Home from "views/Home/Home";
import Login from "views/Login/Login";
import Register from "views/Register/Register";
import PortafoliosDetalles from "layouts/dashboard/components/PortafoliosDetalles";

const createCollapseRoute = (name, key, icon, route, component) => ({
  type: "collapse",
  name: (
    <Typography variant="h6" component="div" sx={{ color: (theme) => theme.palette.common.white }}>
      {name}
    </Typography>
  ),
  key,
  icon: <Icon fontSize="large">{icon}</Icon>,
  route,
  component,
});

const routes = [
  { route: "/", component: <Home />, key: "home" },
  createCollapseRoute("Dashboard", "dashboard", "dashboard", "/dashboard", <Dashboard />),
  createCollapseRoute("Activos", "tables", "trending_up", "/tables", <Tables />),
  createCollapseRoute("Perfil", "profile", "person", "/profile", <Profile />),
  { route: "/login", component: <Login />, key: "login" },
  { route: "/register", component: <Register />, key: "register" },
  {
    route: "/portafolio-detalles/:id",
    component: <PortafoliosDetalles />,
    key: "portafolios-detalles",
  },
];

export default routes;
