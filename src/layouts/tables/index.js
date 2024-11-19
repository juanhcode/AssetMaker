// Importaciones principales
import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Card, Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Componentes personalizados
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import projectsTableData from "layouts/tables/data/projectsTableData";
import SelectSmall from "./components/BasicSelect";

function Tables() {
  // Estados
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [loading, setLoading] = useState(true);

  // Manejo de eventos
  const handleOptionChange = (option) => setSelectedOption(option);
  const handleOpen = () => setOpen(true);

  // Manejo de eventos para la paginación
  const manejarCambioDePagina = (nuevaPagina) => {
    setPagina(nuevaPagina); // Actualiza la página actual
    setPaginationModel(nuevaPagina);
    console.log("nueva pagina", pagina);
  };

  // Datos de la tabla
  const { columns: pColumns, rows: pRows } = projectsTableData({ selectedOption, pagina });
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // Carga los datos al montar
  useEffect(() => {
    // Activa el indicador de carga por 3 segundos
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Desactiva el indicador después de 3 segundos
    }, 3000);
  }, [pagina, selectedOption]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
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
                  <MDTypography variant="h3" color="white">
                    Activos en cartera
                  </MDTypography>
                  <SelectSmall optionChange={handleOptionChange} />
                </Box>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <DataGrid
                    rows={pRows}
                    columns={pColumns}
                    onPaginationModelChange={manejarCambioDePagina}
                    paginationMode="server"
                    rowCount={100}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel } }}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                      "& .MuiDataGrid-cell": {
                        fontSize: "1.2rem",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        fontSize: "1.3rem",
                      },
                    }}
                  />
                )}
              </MDBox>
              <MDBox mx={2} py={2} px={2}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  style={{ fontSize: "1.2rem", color: "white" }}
                >
                  Agregar Activo
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}
export default Tables;
