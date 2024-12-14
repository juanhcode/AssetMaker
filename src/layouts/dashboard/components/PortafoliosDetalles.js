import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Importa los elementos necesarios
import { Doughnut } from "react-chartjs-2"; // Para gráficos de torta
import { Grid, Box, Typography, Button, Icon, Divider } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import theme from "assets/theme";
import { ENDPOINTS } from "../../../config";

// Registra los elementos requeridos
ChartJS.register(ArcElement, Tooltip, Legend);

function PortafoliosDetalles() {
  const { id } = useParams();
  const [portafolios, setPortafolios] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortafolios = async () => {
      try {
        const response = await fetch(ENDPOINTS.DETALLE_PORTAFOLIO(id));
        console.log("response", response.data);
        if (response.ok) {
          const data = await response.json();
          setPortafolios(data);
          setLoading(false); // Establecer loading en false una vez se obtienen los datos
        } else {
          console.log("No se pudo obtener Detalles del Portafolio.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setLoading(false);
      }
    };

    fetchPortafolios();
  }, []);

  const handleReport = () => {
    alert(`Generando reporte para ${portafolios.name}`);
  };

  // Configuración de los gráficos
  const getChartData = (data, labels) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#E91E63", "#FF5722"], // Colores principales
        hoverBackgroundColor: ["#66BB6A", "#FFD54F", "#42A5F5", "#EC407A", "#FF7043"], // Colores al pasar el mouse
        borderColor: "#ffffff", // Bordes blancos para mayor contraste
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
              {/* Nombre y descripción */}
              <Grid item xs={12} md={8}>
                <Typography variant="h2" fontWeight="bold">
                  {portafolios.name}
                </Typography>
                <Typography variant="h3" mt={2}>
                  {portafolios.description}
                </Typography>
              </Grid>
              {/* Botón Generar Reporte */}
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

            {/* Gráficos */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Riesgo por activo
                </Typography>
                <Doughnut
                  data={getChartData(portafolios.riesgo, ["Activo 1", "Activo 2", "Activo 3"])}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Rendimiento mensual
                </Typography>
                <Doughnut
                  data={getChartData(portafolios.rendimiento, ["Activo 1", "Activo 2", "Activo 3"])}
                />
              </Grid>
            </Grid>
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
