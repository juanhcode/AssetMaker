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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography
          display="block"
          variant="button"
          fontWeight="medium"
          sx={{ fontSize: "1.2rem" }}
        >
          {name}
        </MDTypography>
        <MDTypography variant="caption" sx={{ fontSize: "1.1rem" }}>
          {email}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
        sx={{ fontSize: "1.2rem" }}
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption" sx={{ fontSize: "1.1rem" }}>
        {description}
      </MDTypography>
    </MDBox>
  );

  const Header = ({ children }) => (
    <MDTypography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
      {children}
    </MDTypography>
  );

  return {
    columns: [
      { Header: <Header>autor</Header>, accessor: "autor", width: "45%", align: "left" },
      { Header: <Header>función</Header>, accessor: "función", align: "left" },
      { Header: <Header>estado</Header>, accessor: "estado", align: "center" },
      { Header: <Header>empleado</Header>, accessor: "empleado", align: "center" },
      { Header: <Header>acción</Header>, accessor: "acción", align: "center" },
    ],

    rows: [
      {
        autor: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        función: <Job title="Manager" description="Organization" />,
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        empleado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            23/04/18
          </MDTypography>
        ),
        acción: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            Edit
          </MDTypography>
        ),
      },
      {
        autor: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        función: <Job title="Programator" description="Developer" />,
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        empleado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            11/01/19
          </MDTypography>
        ),
        acción: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            Edit
          </MDTypography>
        ),
      },
      {
        autor: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        función: <Job title="Executive" description="Projects" />,
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        empleado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            19/09/17
          </MDTypography>
        ),
        acción: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            Edit
          </MDTypography>
        ),
      },
      {
        autor: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        función: <Job title="Programator" description="Developer" />,
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        empleado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            24/12/08
          </MDTypography>
        ),
        acción: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            Edit
          </MDTypography>
        ),
      },
      {
        autor: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        función: <Job title="Manager" description="Executive" />,
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        empleado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            04/10/21
          </MDTypography>
        ),
        acción: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            Edit
          </MDTypography>
        ),
      },
      {
        autor: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        función: <Job title="Programator" description="Developer" />,
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        empleado: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            14/09/20
          </MDTypography>
        ),
        acción: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ fontSize: "1.2rem" }}
          >
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
