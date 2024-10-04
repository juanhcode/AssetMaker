import React, { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "./components/projects";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [cantidadPortafolios, setCantidadPortafolios] = useState(0);
  const [activosEnCartera, setActivosEnCartera] = useState(0);
  const [rentabilidadTotal, setRentabilidadTotal] = useState(0);
  const [perfilRiesgo, setPerfilRiesgo] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      setCantidadPortafolios(5);
      setActivosEnCartera(20);
      setRentabilidadTotal(15);
      setPerfilRiesgo("Alto");
    };
    obtenerDatos();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="inventory"
                title={
                  <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Cantidad de portafolios
                  </span>
                }
                count={
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {cantidadPortafolios}
                  </span>
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: <span style={{ fontSize: "1.1rem" }}>Actualizado automáticamente</span>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="trending_up"
                title={
                  <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Activos en cartera</span>
                }
                count={
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{activosEnCartera}</span>
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: <span style={{ fontSize: "1.1rem" }}>Actualizado automáticamente</span>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="pie_chart"
                title={
                  <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Perfil de riesgo</span>
                }
                count={
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{perfilRiesgo}</span>
                }
                percentage={{
                  color: "warning",
                  amount: "",
                  label: <span style={{ fontSize: "1.1rem" }}>Actualizado automáticamente</span>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="show_chart"
                title={
                  <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Rentabilidad total</span>
                }
                count={
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {`${rentabilidadTotal}%`}
                  </span>
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: <span style={{ fontSize: "1.1rem" }}>Actualizado automáticamente</span>,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title={
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      Visitas al sitio web
                    </span>
                  }
                  description={
                    <span style={{ fontSize: "1.1rem" }}>Resultados de la última campaña</span>
                  }
                  date={<span style={{ fontSize: "1.1rem" }}>campaña enviada hace 2 días</span>}
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title={
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Ventas diarias</span>
                  }
                  description={
                    <>
                      (<strong>+15%</strong>)
                      <span style={{ fontSize: "1.1rem" }}>aumento de las ventas actuales.</span>
                    </>
                  }
                  date={<span style={{ fontSize: "1.1rem" }}>actualizado hace 4 min</span>}
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title={
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      Tareas completadas
                    </span>
                  }
                  description={
                    <span style={{ fontSize: "1.1rem" }}>Resultados de la última campaña</span>
                  }
                  date={<span style={{ fontSize: "1.1rem" }}>recién actualizado</span>}
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
