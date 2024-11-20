import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";

const initialPortfolios = [
  {
    id: 1,
    name: "Portafolio 1",
    description: "Portafolio inicial",
    image: homeDecor1,
  },
  {
    id: 2,
    name: "Portafolio 2",
    description: "Otro portafolio",
    image: homeDecor2,
  },
];

const initialNewPortfolio = {
  name: "",
  description: "",
  image: null,
};

const buttonStyles = {
  fontSize: "1rem",
  fontWeight: "bold",
};

function Portfolios() {
  const theme = useTheme();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newPortfolio, setNewPortfolio] = useState(initialNewPortfolio);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPortfolioId, setCurrentPortfolioId] = useState(null);

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleOpen = (portfolioId = null) => {
    if (portfolioId !== null) {
      // Modo edición
      const portfolioToEdit = portfolios.find((p) => p.id === portfolioId);
      setNewPortfolio(portfolioToEdit);
      setIsEditing(true);
      setCurrentPortfolioId(portfolioId);
    } else {
      // Modo creación
      setNewPortfolio(initialNewPortfolio);
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPortfolio(initialNewPortfolio);
    setIsEditing(false);
    setCurrentPortfolioId(null);
  };

  const handleChange = ({ target: { name, value } }) => {
    setNewPortfolio((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ target }) => {
    const file = target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        setNewPortfolio((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPortfolio = () => {
    const newPortfolioWithId = {
      ...newPortfolio,
      id: portfolios.length + 1,
    };
    setPortfolios([...portfolios, newPortfolioWithId]);
    handleClose();
  };

  const handleEditPortfolio = () => {
    const updatedPortfolios = portfolios.map((portfolio) =>
      portfolio.id === currentPortfolioId ? { ...portfolio, ...newPortfolio } : portfolio
    );
    setPortfolios(updatedPortfolios);
    handleClose();
  };

  return (
    <Card>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" sx={{ fontSize: "1.5rem" }}>
          Mis Portafolios de Inversión
        </MDTypography>
        <MDBox pt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
            sx={{
              padding: "5px 10px",
              borderRadius: "8px",
              color: theme.palette.common.white,
              ...buttonStyles,
            }}
          >
            Crear Nuevo Portafolio
          </Button>
        </MDBox>
        <MDBox sx={{ maxHeight: "600px", overflowY: "auto", padding: 2 }}>
          {isLoading ? (
            <MDBox display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </MDBox>
          ) : (
            <Grid container spacing={2}>
              {portfolios.map((portfolio) => (
                <Grid item xs={12} sm={6} md={6} xl={3} key={portfolio.id}>
                  <DefaultProjectCard
                    image={portfolio.image}
                    label={portfolio.description}
                    title={portfolio.name}
                    action={{
                      type: "internal",
                      color: "info",
                      label: "Ver Detalles",
                    }}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(portfolio.id)}
                    sx={{ marginTop: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          )}
        </MDBox>
      </MDBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Editar Portafolio" : "Crear Nuevo Portafolio"}</DialogTitle>
        <DialogContent>
          {[
            { label: "Nombre del Portafolio", name: "name" },
            { label: "Descripción", name: "description" },
          ].map(({ label, name }) => (
            <TextField
              key={name}
              margin="dense"
              name={name}
              label={label}
              type="text"
              fullWidth
              value={newPortfolio[name]}
              onChange={handleChange}
            />
          ))}
          <TextField
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            fullWidth
            margin="dense"
          />
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
            onClick={isEditing ? handleEditPortfolio : handleAddPortfolio}
            variant="contained"
            sx={{
              ...buttonStyles,
              bgcolor: theme.palette.success.state,
              color: theme.palette.common.white,
              "&:hover": {
                bgcolor: theme.palette.info.main,
              },
            }}
          >
            {isEditing ? "Guardar Cambios" : "Crear Portafolio"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Portfolios;
