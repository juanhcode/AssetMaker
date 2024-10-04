import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";

const inicialPortafoliosData = [
  {
    id: 1,
    name: "Portafolio 1",
    assetType: "Acciones",
    return: "8%",
    image: homeDecor1,
  },
  {
    id: 2,
    name: "Portafolio 2",
    assetType: "Bonos",
    return: "5%",
    image: homeDecor2,
  },
];

function Projects() {
  const [portafolios, setPortafolios] = useState(inicialPortafoliosData);
  const [open, setOpen] = useState(false);
  const [newPortafolio, setNewPortafolio] = useState({
    name: "",
    assetType: "",
    return: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://mocki.io/v1/46312168-1549-4df7-96bc-2aff243f02ef")
      .then((response) => response.json())
      .then((data) => {
        setPortafolios(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los portafolios:", error);
        setIsLoading(false);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPortafolio({ ...newPortafolio, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPortafolio({ ...newPortafolio, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddPortafolio = () => {
    const newPortafolioWithId = {
      ...newPortafolio,
      id: portafolios.length + 1,
    };
    setPortafolios((prevPortafolios) => [...portafolios, newPortafolioWithId]);
    setNewPortafolio({ name: "", assetType: "", return: "", image: null });
    handleClose();
  };

  return (
    <Card>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" style={{ fontSize: "1.5rem" }}>
          Mis Portafolios de Inversión
        </MDTypography>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDBox mb={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{
                padding: "5px 10px",
                fontSize: "10px",
                fontWeight: "bold",
                borderRadius: "8px",
                color: (theme) => theme.palette.common.white,
              }}
            >
              Agregar Nuevo Portafolio
            </Button>
          </MDBox>
        </MDBox>
        <MDBox
          sx={{
            maxHeight: "600px",
            overflowY: "auto",
            padding: 2,
          }}
        >
          {isLoading ? (
            <MDBox display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </MDBox>
          ) : (
            <Grid container spacing={6}>
              {portafolios.map((portafolio) => (
                <Grid item xs={12} sm={6} md={6} xl={3} key={portafolio.id}>
                  <DefaultProjectCard
                    image={portafolio.image}
                    label={
                      <MDTypography variant="body1" style={{ fontSize: "1.2rem" }}>
                        {portafolio.assetType}
                      </MDTypography>
                    }
                    title={
                      <MDTypography
                        variant="body1"
                        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                      >
                        {portafolio.name}
                      </MDTypography>
                    }
                    description={
                      <MDTypography variant="body1" style={{ fontSize: "1.1rem" }}>
                        Rendimiento: {portafolio.return}
                      </MDTypography>
                    }
                    action={{
                      type: "internal",
                      route: `/portafolios/${portafolio.id}`,
                      color: "info",
                      label: "Ver Detalles",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </MDBox>
      </MDBox>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h4">Agregar Nuevo Portafolio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre del Portafolio"
            type="text"
            fullWidth
            value={newPortafolio.name}
            onChange={handleChange}
            InputProps={{
              sx: { fontSize: "1.2rem" },
            }}
            InputLabelProps={{
              sx: { fontSize: "1.2rem" },
            }}
          />
          <TextField
            margin="dense"
            name="assetType"
            label="Tipo de Activo"
            type="text"
            fullWidth
            value={newPortafolio.assetType}
            onChange={handleChange}
            InputProps={{
              sx: { fontSize: "1.2rem" },
            }}
            InputLabelProps={{
              sx: { fontSize: "1.2rem" },
            }}
          />
          <TextField
            margin="dense"
            name="return"
            label="Rendimiento (%)"
            type="text"
            fullWidth
            value={newPortafolio.return}
            onChange={handleChange}
            InputProps={{
              sx: { fontSize: "1.2rem" },
            }}
            InputLabelProps={{
              sx: { fontSize: "1.2rem" },
            }}
          />
          <TextField
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
            InputProps={{
              sx: { fontSize: "1.2rem" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" style={{ fontSize: "1rem" }}>
            Cancelar
          </Button>
          <Button onClick={handleAddPortafolio} color="primary" style={{ fontSize: "1rem" }}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Projects;
