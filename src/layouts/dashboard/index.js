import React, { useState, useEffect } from "react";
// @mui material components
import { Grid, Box, Skeleton } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Portafolios from "./components/Portafolios/index";

function Dashboard() {
  const [rentabilidadTotal, setRentabilidadTotal] = useState(0);
  const [perfilRiesgo, setPerfilRiesgo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      setTimeout(() => {
        setRentabilidadTotal(15);
        setPerfilRiesgo("Alto");
        setLoading(false);
      }, 2000); // Simula una carga de datos
    };
    obtenerDatos();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={2}>
              <ComplexStatisticsCard
                color="error"
                icon="warning"
                title={
                  loading ? (
                    <Skeleton variant="text" width={150} height={30} />
                  ) : (
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Perfil de riesgo</span>
                  )
                }
                count={
                  loading ? (
                    <Skeleton variant="text" width={100} height={40} />
                  ) : (
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{perfilRiesgo}</span>
                  )
                }
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={2}>
              <ComplexStatisticsCard
                color="success"
                icon="show_chart"
                title={
                  loading ? (
                    <Skeleton variant="text" width={150} height={30} />
                  ) : (
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Rentabilidad total
                    </span>
                  )
                }
                count={
                  loading ? (
                    <Skeleton variant="text" width={100} height={40} />
                  ) : (
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      {`${rentabilidadTotal}%`}
                    </span>
                  )
                }
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid>
          <MDBox
            mt={3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <MDTypography
                variant="h3"
                color="white"
                fontWeight="medium"
                sx={{ fontSize: "2rem" }}
              >
                Mis Portafolios de Inversión
              </MDTypography>
            </Box>
          </MDBox>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Portafolios />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
