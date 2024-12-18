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
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");
  let userModel = {};
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log("Decoded token", decodedToken);

  userModel = {
    id: decodedToken.id,
    first_name: decodedToken.firstName,
    last_names: decodedToken.lastName,
    email: decodedToken.email,
    risk_profile: decodedToken.riskProfile,
  };

  useEffect(() => {
    const fetchPortafolios = async () => {
      try {
        const response = await fetch(ENDPOINTS.PORTAFOLIO(userModel.id));
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

    let successCount = 0;

    for (const row of selectedRow) {
      try {
        // Verificar si el activo ya existe por name
        const getResponse = await fetch(ENDPOINTS.ACTIVOS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let assetId;

        if (getResponse.ok) {
          const activos = await getResponse.json();
          const existingAsset = activos.find((activo) => activo.name === row.name);

          if (existingAsset) {
            // El activo ya existe, obtener el ID
            assetId = existingAsset.id;
          } else {
            // El activo no existe, crear uno nuevo
            const createResponse = await fetch(ENDPOINTS.CREATE_ACTIVO, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: row.name,
                symbol: row.symbol,
                //fiveYearPerformance: row.fiveYearPerformance,
                //fiveYearRisk: row.fiveYearRisk,
                //maximumYield: row.maximumYield,
                //minimumYield: row.minimumYield,
                //tipo: selectedOption,
              }),
            });

            if (createResponse.ok) {
              const createdData = await createResponse.json();
              assetId = createdData.id;
            } else {
              console.error(`Error al crear activo: ${row.name}`);
              continue;
            }
          }
        } else {
          console.error("Error al consultar activos existentes");
          continue;
        }

        // Agregar el activo al portafolio
        const portfolioResponse = await fetch(ENDPOINTS.CREATE_ACTIVO_PORTAFOLIO, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPortfolio: selectedPortafolio,
            idAsset: assetId,
          }),
        });

        if (portfolioResponse.ok) {
          successCount++;
        } else {
          console.error(`Error al agregar el activo ${assetId} al portafolio.`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    if (successCount > 0) {
      setSuccessMessage(`Se han agregado ${successCount} activos al portafolio con éxito.`);
      setSuccessModalOpen(true);
    }

    handleClose();
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
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": { height: "60px" }, // Ajusta la altura
              "& .MuiInputBase-input": { fontSize: "1.5rem" }, // Tamaño del texto
            }}
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
      <Dialog open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <DialogTitle>Éxito</DialogTitle>
        <DialogContent>
          <MDTypography variant="body1" color="textPrimary">
            {successMessage}
          </MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessModalOpen(false)} variant="contained" color="white">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;
