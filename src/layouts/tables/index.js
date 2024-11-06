// Importaciones principales
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import projectsTableData from "layouts/tables/data/projectsTableData";
import SelectSmall from "./components/BasicSelect";

// Estilos para el modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Tables() {
  const [selectedOption, setSelectedOption] = useState("");

  // Estado para controlar la apertura del modal
  const [open, setOpen] = useState(false);

  // Estados para el formulario de agregar activo
  const [newAsset, setNewAsset] = useState({
    name: "",
    symbol: "",
    price: "",
  });

  const handleOptionChange = (option) => setSelectedOption(option);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  // Datos de la tabla
  const { columns: pColumns, rows: pRows } = projectsTableData({ selectedOption });

  const paginationModel = { page: 0, pageSize: 10 };

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
                <DataGrid
                  rows={pRows}
                  columns={pColumns}
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

      {/* Modal para agregar un nuevo activo */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <MDTypography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "22px", fontWeight: "bold", color: "dark" }}
          >
            Agregar Nuevo Activo
          </MDTypography>
          <MDBox component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre del Activo"
              name="name"
              value={newAsset.name}
              onChange={handleChange}
              margin="normal"
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              label="Símbolo del Activo"
              name="symbol"
              value={newAsset.symbol}
              onChange={handleChange}
              margin="normal"
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              label="Precio"
              name="price"
              value={newAsset.price}
              onChange={handleChange}
              margin="normal"
              sx={{ marginBottom: "15px" }}
            />
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                fontSize: "14px",
                padding: "10px 20px",
                color: "#FF5733",
                borderColor: "#FF5733",
                marginRight: "10px",
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: "14px",
                padding: "10px 20px",
                color: "#FFF",
                borderColor: "#007BFF",
              }}
            >
              Agregar
            </Button>
          </MDBox>
        </Box>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
