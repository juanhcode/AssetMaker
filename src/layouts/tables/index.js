// Importaciones principales
import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Card, Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Componentes personalizados
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import projectsTableData from "layouts/tables/data/projectsTableData";
import nasdaq from "layouts/tables/data/nasdaq";

import SelectSmall from "./components/BasicSelect";

function Tables() {
  // Estados
  const [selectedOption, setSelectedOption] = useState("criptomonedas");
  const [pagina, setPagina] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [selectedRow, setSelectedRow] = useState(null);

  // Manejo de eventos
  const handleOptionChange = (option) => setSelectedOption(option);

  // Manejo de eventos para la paginación
  const manejarCambioDePagina = (nuevaPagina) => {
    setPagina(nuevaPagina); // Actualiza la página actual
    setPaginationModel(nuevaPagina);
    console.log("nueva pagina", nuevaPagina);
  };

  // Datos de la tabla
  const { columns: pColumns, rows: pRows } =
    selectedOption === "criptomonedas"
      ? projectsTableData({ selectedOption, pagina })
      : nasdaq({ selectedOption, pagina });

  const handleRowSelection = (selectionModel) => {
    // Obtener el dato del ítem seleccionado
    const selected = pRows.filter((row) => selectionModel.includes(row.id));
    setSelectedRow(selected);
  };
  const sendData = () => {
    if (selectedRow.length > 0) {
      // Realizar la petición con los datos seleccionados
      console.log("Enviando datos: ", selectedRow);
      // Aquí puedes usar fetch, axios, etc.
    } else {
      alert("No has seleccionado ninguna fila");
    }
  };

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
                    Activos disponibles
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
                    rowCount={5000}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel } }}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={handleRowSelection}
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
                  onClick={sendData}
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
    </DashboardLayout>
  );
}
export default Tables;
