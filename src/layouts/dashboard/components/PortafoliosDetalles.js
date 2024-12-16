import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Grid,
  Box,
  Typography,
  Button,
  Icon,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import theme from "assets/theme";
import { ENDPOINTS } from "../../../config";

ChartJS.register(ArcElement, Tooltip, Legend);

function PortafoliosDetalles() {
  const { id } = useParams();
  const [portafolios, setPortafolios] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activos, setActivos] = useState([]);

  useEffect(() => {
    const fetchPortafolios = async () => {
      try {
        const response = await fetch(ENDPOINTS.DETALLE_PORTAFOLIO(id));
        if (response.ok) {
          const data = await response.json();
          setPortafolios(data);
          setLoading(false);
        } else {
          console.error("No se pudo obtener Detalles del Portafolio.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setLoading(false);
      }
    };

    const fetchActivos = async () => {
      try {
        const response = await fetch(ENDPOINTS.ACTIVOS_PORTAFOLIO(id));
        if (response.ok) {
          const data = await response.json();
          setActivos(data);
        } else {
          console.error("No se pudieron obtener Activos del Portafolio.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchPortafolios();
    fetchActivos();
  }, [id]);

  const handleReport = () => {
    alert(`Generando reporte para ${portafolios.name}`);
  };

  const getChartData = (data, labels) => ({
    labels: labels || ["Categoría 1", "Categoría 2", "Categoría 3"],
    datasets: [
      {
        data: data?.length ? data : [30, 40, 30], // Valores quemados
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#E91E63", "#FF5722"],
        hoverBackgroundColor: ["#66BB6A", "#FFD54F", "#42A5F5", "#EC407A", "#FF7043"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        {loading ? (
          <Typography variant="h4">Cargando portafolios...</Typography>
        ) : portafolios ? (
          <Box>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h2" fontWeight="bold">
                  {portafolios.name}
                </Typography>
                <Typography variant="h3" mt={2}>
                  {portafolios.description}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} textAlign={{ xs: "left", md: "right" }}>
                <Button
                  variant="outlined"
                  color="white"
                  fullWidth
                  startIcon={<Icon>bar_chart</Icon>}
                  onClick={handleReport}
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    bgcolor: theme.palette.info.main,
                    "&:hover": {
                      bgcolor: theme.palette.info.dark,
                    },
                  }}
                >
                  Generar Reporte
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Riesgo por activo
                </Typography>
                <Doughnut
                  data={getChartData(portafolios?.riesgo, ["Activo 1", "Activo 2", "Activo 3"])}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Rendimiento mensual
                </Typography>
                <Doughnut
                  data={getChartData(portafolios?.rendimiento, [
                    "Activo 1",
                    "Activo 2",
                    "Activo 3",
                  ])}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold">
                      Perfil de Riesgo
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      {portafolios.perfilRiesgo || "Moderate"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold">
                      Rendimiento Mensual
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      {portafolios.rendimientoMensual || "5%"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold">
                      Desviación Estándar
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      {portafolios.desviacionEstandar || "2.3"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Activos en el Portafolio
            </Typography>
            <List>
              {activos.map((activo) => (
                <ListItem key={activo.id}>
                  <ListItemText primary={activo.name} secondary={`Valor: ${activo.value}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography variant="h4" color="error">
            Portafolio no encontrado.
          </Typography>
        )}
      </Box>
    </DashboardLayout>
  );
}

export default PortafoliosDetalles;
