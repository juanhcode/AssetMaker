/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

  =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography
        display="block"
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
        sx={{ fontSize: "1.2rem" }}
      >
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium" sx={{ fontSize: "1.2rem" }}>
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const Header = ({ children }) => (
    <MDTypography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
      {children}
    </MDTypography>
  );

  return {
    columns: [
      { Header: <Header>proyectos</Header>, accessor: "proyectos", width: "30%", align: "left" },
      { Header: <Header>presupuesto</Header>, accessor: "presupuesto", align: "left" },
      { Header: <Header>estado</Header>, accessor: "estado", align: "center" },
      { Header: <Header>finalización</Header>, accessor: "finalización", align: "center" },
      { Header: <Header>acción</Header>, accessor: "acción", align: "center" },
    ],

    rows: [
      {
        proyectos: <Project image={LogoAsana} name="Asana" />,
        presupuesto: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            $2,500
          </MDTypography>
        ),
        estado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            working
          </MDTypography>
        ),
        finalización: <Progress color="info" value={60} />,
        acción: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        proyectos: <Project image={logoGithub} name="Github" />,
        presupuesto: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            $5,000
          </MDTypography>
        ),
        estado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            done
          </MDTypography>
        ),
        finalización: <Progress color="success" value={100} />,
        acción: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        proyectos: <Project image={logoAtlassian} name="Atlassian" />,
        presupuesto: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            $3,400
          </MDTypography>
        ),
        estado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            canceled
          </MDTypography>
        ),
        finalización: <Progress color="error" value={30} />,
        acción: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        proyectos: <Project image={logoSpotify} name="Spotify" />,
        presupuesto: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            $14,000
          </MDTypography>
        ),
        estado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            working
          </MDTypography>
        ),
        finalización: <Progress color="info" value={80} />,
        acción: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        proyectos: <Project image={logoSlack} name="Slack" />,
        presupuesto: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            $1,000
          </MDTypography>
        ),
        estado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            canceled
          </MDTypography>
        ),
        finalización: <Progress color="error" value={0} />,
        acción: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        proyectos: <Project image={logoInvesion} name="Invesion" />,
        presupuesto: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            $2,300
          </MDTypography>
        ),
        estado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            done
          </MDTypography>
        ),
        finalización: <Progress color="success" value={100} />,
        acción: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
