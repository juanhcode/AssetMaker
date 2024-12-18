import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Skeleton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "assets/theme";
import { ENDPOINTS } from "../../../../config";

const Portafolios = () => {
  const [portafolios, setPortafolios] = useState([]);
  const [newPortafolios, setNewPortafolios] = useState({
    name: "",
    description: "",
  });
  const [currentPortafoliosId, setCurrentPortafoliosId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de los portafolios

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
  // Obtener los portafolios del usuario (GET)
  useEffect(() => {
    const fetchPortafolios = async () => {
      try {
        const response = await fetch(ENDPOINTS.PORTAFOLIO(userModel.id));
        if (response.ok) {
          const data = await response.json();
          setPortafolios(data);
          setLoading(false); // Establecer loading en false una vez se obtienen los datos
        } else {
          console.log("No se pudieron obtener los portafolios.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setLoading(false);
      }
    };

    fetchPortafolios();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    if (isEditing) {
      const portafolioToEdit = portafolios.find(
        (portafolio) => portafolio.id === currentPortafoliosId
      );
      setNewPortafolios({
        name: portafolioToEdit.name,
        description: portafolioToEdit.description,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  const handleAddPortafolios = async () => {
    if (!newPortafolios.name.trim() || !newPortafolios.description.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const portafolioData = {
      name: newPortafolios.name,
      description: newPortafolios.description,
      averageAnnualReturn: 15.62,
      portfolioPerformance: 43.52,
      standardDeviation: 25.58,
      idUser: userModel.id, // Cambiar por el ID del usuario actual
    };

    try {
      const response = await fetch(ENDPOINTS.CREATE_PORTAFOLIO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portafolioData),
      });

      if (response.ok) {
        const newPortafolio = await response.json();
        setPortafolios([...portafolios, newPortafolio]);
        handleClose();
      } else {
        alert("Error al crear el portafolio.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al crear el portafolio.");
    }
  };

  const handleEditPortafolios = async () => {
    const updatedPortafoliosData = {
      ...newPortafolios,
      averageAnnualReturn: 50.21,
      portfolioPerformance: 21.01,
      standardDeviation: 40.05,
      idUser: 1,
    };

    try {
      const response = await fetch(ENDPOINTS.EDIT_PORTAFOLIO(currentPortafoliosId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPortafoliosData),
      });

      if (response.ok) {
        const updatedPortafolio = await response.json();
        setPortafolios(
          portafolios.map((portafolio) =>
            portafolio.id === currentPortafoliosId ? updatedPortafolio : portafolio
          )
        );
        handleClose();
      } else {
        alert("Error al actualizar el portafolio.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al actualizar el portafolio.");
    }
  };

  const handleDelete = async (portafoliosId) => {
    try {
      const response = await fetch(ENDPOINTS.DELETE_PORTAFOLIO(portafoliosId), {
        method: "DELETE",
      });

      if (response.ok) {
        setPortafolios(portafolios.filter((p) => p.id !== portafoliosId));
      } else {
        alert("Error al eliminar el portafolio.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al eliminar el portafolio.");
    }
  };

  const buttonStyles = {
    fontSize: "1rem",
    fontWeight: "bold",
  };

  return (
    <Card>
      <Box p={2}>
        <Box pt={1} display="flex" justifyContent="flex-end">
          <Tooltip title="Crear nuevo portafolio">
            <IconButton
              color="white"
              onClick={() => {
                setIsEditing(false);
                handleOpen();
              }}
              sx={{
                padding: "10px",
                borderRadius: "50%",
                bgcolor: theme.palette.info.main,
                "&:hover": {
                  bgcolor: theme.palette.info.dark,
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Contenedor de los portafolios */}
        <Box sx={{ maxHeight: "600px", overflowY: "auto", padding: 2 }}>
          <Grid container spacing={2}>
            {loading ? (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={40}
                      sx={{ marginBottom: "16px" }}
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={20}
                      sx={{ marginBottom: "8px" }}
                    />
                    <Skeleton variant="text" width="90%" height={20} sx={{ marginBottom: "8px" }} />
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              portafolios.map((portafolio) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={portafolio.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4">{portafolio.name}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginBottom: "50px" }}
                      >
                        {portafolio.description}
                      </Typography>

                      {/* Botón para ver detalles */}
                      <Link
                        to={`/portafolio-detalles/${portafolio.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined"
                          color="white"
                          fullWidth
                          sx={{
                            mt: 1,
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            bgcolor: theme.palette.info.main,
                            "&:hover": {
                              bgcolor: theme.palette.info.dark,
                            },
                          }}
                        >
                          Ver detalles
                        </Button>
                      </Link>
                      <Box display="flex" justifyContent="space-between">
                        <Tooltip title="Editar portafolio">
                          <IconButton
                            color="info"
                            onClick={() => {
                              setIsEditing(true);
                              setCurrentPortafoliosId(portafolio.id);
                              handleOpen();
                            }}
                            sx={{
                              fontSize: "2rem",
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar portafolio">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(portafolio.id)}
                            sx={{
                              fontSize: "2rem",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>

      {/* Modal para agregar o editar portafolio */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Editar Portafolio" : "Agregar Nuevo Portafolio"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre del Portafolio"
            fullWidth
            value={newPortafolios.name}
            onChange={(e) => setNewPortafolios({ ...newPortafolios, name: e.target.value })}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            label="Descripción"
            fullWidth
            value={newPortafolios.description}
            onChange={(e) => setNewPortafolios({ ...newPortafolios, description: e.target.value })}
            sx={{ marginBottom: "15px" }}
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
            onClick={isEditing ? handleEditPortafolios : handleAddPortafolios}
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
            {isEditing ? "Guardar Cambios" : "Crear Portafolio"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Portafolios;
