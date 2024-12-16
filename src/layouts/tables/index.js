import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import projectsTableData from "layouts/tables/data/projectsTableData";
import nasdaq from "layouts/tables/data/nasdaq";
import SelectSmall from "./components/BasicSelect";
import theme from "assets/theme";
import { ENDPOINTS } from "config";

function Tables() {
  const [selectedOption, setSelectedOption] = useState("criptomonedas");
  const [pagina, setPagina] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [selectedRow, setSelectedRow] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState(false);
  const [portafolios, setPortafolios] = useState([]);
  const [selectedPortafolio, setSelectedPortafolio] = useState("");

  useEffect(() => {
    const fetchPortafolios = async () => {
      try {
        const response = await fetch(ENDPOINTS.PORTAFOLIO(1));
        if (response.ok) {
          const data = await response.json();
          setPortafolios(data);
        } else {
          console.log("No se pudieron obtener los portafolios.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchPortafolios();
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setLoading(true);
  };

  const manejarCambioDePagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
    setPaginationModel(nuevaPagina);
    console.log("nueva pagina", nuevaPagina);
  };

  const { columns: pColumns, rows: pRows } =
    selectedOption === "criptomonedas"
      ? projectsTableData({ selectedOption, pagina })
      : nasdaq({ selectedOption, pagina });

  const handleRowSelection = (selectionModel) => {
    const selected = pRows.filter((row) => selectionModel.includes(row.id));
    setSelectedRow(selected);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePortafolioChange = (event) => {
    setSelectedPortafolio(event.target.value);
  };

  const sendData = async () => {
    if (!selectedPortafolio || !selectedRow || selectedRow.length === 0) {
      alert("Selecciona un portafolio y al menos un activo.");
      return;
    }

    // Aqui se puede hacer el llamado a la API para agregar los activos al portafolio
    const response = await fetch(ENDPOINTS.CREATE_ACTIVO_PORTAFOLIO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        portafolio_id: selectedPortafolio,
        activos: selectedRow.map((row) => row.id),
      }),
    });

    if (response.ok) {
      alert("Activos agregados al portafolio con éxito");
      handleClose();
    } else {
      alert("Error al agregar activos al portafolio");
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedOption === "criptomonedas") {
        setTotalRows(21);
      } else if (selectedOption === "nasdaq") {
        setTotalRows(5212);
      }
      setLoading(false);
    }, 3000);
  }, [pagina, selectedOption]);

  const buttonStyles = {
    fontSize: "1rem",
    fontWeight: "bold",
  };

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
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h3" color="white">
                      Activos Disponibles
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectSmall optionChange={handleOptionChange} />
                  </Grid>
                </Grid>
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
                    rowCount={totalRows}
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
                      "& .Mui-selected": {
                        backgroundColor: "rgba(0, 123, 255, 0.2) !important",
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Selecciona un Portafolio</DialogTitle>
        <DialogContent>
          <Select
            value={selectedPortafolio}
            onChange={handlePortafolioChange}
            fullWidth
            sx={{ mt: 2 }}
          >
            {portafolios.map((portafolio) => (
              <MenuItem key={portafolio.id} value={portafolio.id}>
                {portafolio.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              ...buttonStyles,
              bgcolor: theme.palette.error.main,
              color: theme.palette.common.white,
              borderColor: theme.palette.error.main,
              "&:hover": {
                bgcolor: theme.palette.error.main,
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={sendData}
            variant="contained"
            sx={{
              ...buttonStyles,
              bgcolor: theme.palette.info.main,
              color: theme.palette.common.white,
              "&:hover": {
                bgcolor: theme.palette.info.main,
              },
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;
