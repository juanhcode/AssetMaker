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
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import theme from "assets/theme";
import { ENDPOINTS } from "../../../config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

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
          console.log("Activos del Portafolio:", data);
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

  const handleReport = async () => {
    await handleDownloadPDF();
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const margin = 10;
    let yPosition = 10; // Posición inicial

    // Añadir el título del reporte
    doc.setFontSize(16);
    doc.text("Reporte del Portafolio", margin, yPosition);
    yPosition += 10;

    // Capturar y añadir los gráficos al PDF
    const charts = document.querySelectorAll("canvas"); // Seleccionar todos los gráficos (canvas)
    for (const chart of charts) {
      const canvasImage = chart.toDataURL("image/png");
      const imgWidth = 180; // Ajustar ancho para el PDF
      const imgHeight = (chart.height * imgWidth) / chart.width; // Mantener proporción

      if (yPosition + imgHeight > doc.internal.pageSize.height) {
        doc.addPage(); // Crear nueva página si no hay espacio
        yPosition = margin;
      }

      doc.addImage(canvasImage, "PNG", margin, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10; // Ajustar la posición para el próximo gráfico
    }

    // Añadir la tabla de activos
    yPosition += 10; // Espaciado antes de la tabla
    doc.setFontSize(14);
    doc.text("Activos del Portafolio", margin, yPosition);
    yPosition += 10;

    const tableHeaders = [
      "Nombre",
      "Símbolo",
      "5 Años (%)",
      "Riesgo (%)",
      "Máximo (%)",
      "Mínimo (%)",
    ];
    const tableData = activos.map((activo) => [
      activo.name,
      activo.symbol,
      activo.fiveYearPerformance,
      activo.fiveYearRisk,
      activo.maximumYield,
      activo.minimumYield,
    ]);

    const tableColumnWidth = [40, 25, 25, 25, 30, 30];

    doc.autoTable({
      startY: yPosition,
      head: [tableHeaders],
      body: tableData,
      columnStyles: {
        0: { cellWidth: tableColumnWidth[0] },
        1: { cellWidth: tableColumnWidth[1] },
        2: { cellWidth: tableColumnWidth[2] },
        3: { cellWidth: tableColumnWidth[3] },
        4: { cellWidth: tableColumnWidth[4] },
        5: { cellWidth: tableColumnWidth[5] },
      },
      styles: { fontSize: 10 }, // Reducir tamaño de fuente para ajustarse al espacio
    });

    // Descargar el PDF
    doc.save("reporte_portafolio.pdf");
  };

  // Calcular el rendimiento mensual promedio
  const rendimientoMensualPromedio =
    activos.length > 0
      ? activos.reduce((acc, activo) => acc + (activo.fiveYearPerformance || 0), 0) / activos.length
      : 0;

  // Calcular la desviación estándar promedio
  const desviacionEstandarPromedio =
    activos.length > 0
      ? activos.reduce((acc, activo) => acc + (activo.fiveYearRisk || 0), 0) / activos.length
      : 0;

  const getChartData = (data, labels) => ({
    labels: labels || ["Categoría 1", "Categoría 2", "Categoría 3"],
    datasets: [
      {
        data: data?.length ? data : [30, 40, 30], // Valores predeterminados
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
                <Box sx={{ maxWidth: 300, margin: "0 auto" }}>
                  <Doughnut
                    data={getChartData(
                      activos.map((activo) => activo.fiveYearRisk),
                      activos.map((activo) => activo.name)
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Rendimiento mensual
                </Typography>
                <Box sx={{ width: "90%", height: "90%" }}>
                  <Doughnut
                    data={getChartData(
                      activos.map((activo) => activo.fiveYearRisk),
                      activos.map((activo) => activo.name)
                    )}
                  />
                </Box>
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
                      {rendimientoMensualPromedio.toFixed(2)}%
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
                      {desviacionEstandarPromedio.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Activos en el Portafolio
            </Typography>
            <Grid container spacing={4}>
              {activos.map((activo) => (
                <Grid item xs={12} sm={6} md={4} key={activo.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {activo.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Símbolo: {activo.symbol}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2">
                        Rendimiento a 1 año: {activo.fiveYearPerformance}%
                      </Typography>
                      <Typography variant="body2">
                        Riesgo a 5 año: {activo.fiveYearRisk}%
                      </Typography>
                      <Typography variant="body2">
                        Rendimiento máximo: {activo.maximumYield}%
                      </Typography>
                      <Typography variant="body2">
                        Rendimiento mínimo: {activo.minimumYield}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
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
