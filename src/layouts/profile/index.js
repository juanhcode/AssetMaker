import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  TextField,
  Button,
  Grid,
  Skeleton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import { ENDPOINTS } from "config";
import { useParams } from "react-router-dom";

function Overview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [openModal, setOpenModal] = useState({ update: false, delete: false });
  const [profileData, setProfileData] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Perfil_De_Riesgo: "",
  });
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Perfil_De_Riesgo: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para simular un timeout
    const timeout = (ms) =>
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

    const fetchUserData = async () => {
      try {
        const response = await Promise.race([
          fetch(ENDPOINTS.USERS),
          timeout(3000), // Timeout en 3 segundos
        ]);

        console.log("Response", response);

        if (!response.ok) {
          throw new Error("Error al cargar los datos del usuario");
        }

        const data = await response.json();
        setProfileData({
          id: data[0].id,
          Nombre: data[0].first_name,
          Apellido: data[0].last_names,
          Email: data[0].email,
          Perfil_De_Riesgo: data[0].risk_profile,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Datos quemados en caso de error
        setProfileData({
          id: "default-id",
          Nombre: "John",
          Apellido: "Doe",
          Email: "johndoe@example.com",
          Perfil_De_Riesgo: "High",
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleModal = (modal, state) => {
    if (modal === "update" && state) {
      setFormData({
        Nombre: "",
        Apellido: "",
        Email: "",
        Perfil_De_Riesgo: "",
      });
    }
    setOpenModal((prev) => ({ ...prev, [modal]: state }));
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(ENDPOINTS.DELETE_USERS(profileData.id), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      setProfileData({
        Nombre: "",
        Apellido: "",
        Email: "",
        Perfil_De_Riesgo: "",
      });
      handleModal("delete", false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(ENDPOINTS.EDIT_USERS(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      handleModal("update", false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    ...(theme.palette.mode === "light"
      ? {
          bgcolor: "background.paper", // Fondo claro para modo oscuro
          color: theme.palette.text.primary, // Texto principal para modo oscuro
        }
      : {
          bgcolor: "grey.900", // Fondo oscuro para modo claro
          color: "white", // Texto blanco para fondo oscuro
        }),
    borderRadius: "16px",
    boxShadow: theme.shadows[10],
    p: 4,
  };

  const buttonStyles = {
    fontSize: "1rem",
    fontWeight: "bold",
  };

  const textFieldProps = {
    fullWidth: true,
    margin: "normal",
    color: "light",
    onChange: handleChange,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header userName={profileData.Nombre} isLoading={loading}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileInfoCard
                title="Información del perfil"
                info={{
                  Nombre: profileData.Nombre,
                  Apellido: profileData.Apellido,
                  Email: profileData.Email,
                  Perfil_De_Riesgo: profileData.Perfil_De_Riesgo,
                }}
                actions={[
                  {
                    onClick: () => handleModal("update", true),
                    tooltip: "Actualizar Usuario",
                    icon: "edit",
                  },
                  {
                    onClick: () => handleModal("delete", true),
                    tooltip: "Eliminar Usuario",
                    icon: "delete",
                  },
                ]}
                shadow={false}
                isLoading={loading}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>

      {/* Modal para actualizar usuario */}
      <Modal
        open={openModal.update}
        onClose={() => handleModal("update", false)}
        aria-labelledby="modal-update-title"
      >
        <MDBox sx={modalStyles}>
          <MDTypography id="modal-update-title" variant="h4" component="h2" mb={2}>
            Actualizar Usuario
          </MDTypography>
          <MDBox component="form">
            {["Nombre", "Apellido", "Email"].map((field) => (
              <TextField
                key={field}
                label={field}
                name={field}
                value={formData[field]}
                {...textFieldProps}
              />
            ))}
            <FormControl fullWidth margin="normal">
              <InputLabel id="perfil-de-riesgo-label">Perfil De Riesgo</InputLabel>
              <Select
                labelId="perfil-de-riesgo-label"
                id="perfil-de-riesgo"
                name="Perfil_De_Riesgo"
                value={formData.Perfil_De_Riesgo}
                onChange={handleChange}
              >
                <MenuItem value="Conservative">Conservative</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Risky">Risky</MenuItem>
              </Select>
            </FormControl>
            <MDBox mt={3} display="flex" justifyContent="space-between">
              <Button
                onClick={() => handleModal("update", false)}
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
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  ...buttonStyles,
                  bgcolor: theme.palette.success.state,
                  color: theme.palette.common.white,
                  "&:hover": {
                    bgcolor: theme.palette.info.main,
                  },
                }}
              >
                Guardar
              </Button>
            </MDBox>
          </MDBox>
        </MDBox>
      </Modal>

      {/* Modal para eliminar usuario */}
      <Modal
        open={openModal.delete}
        onClose={() => handleModal("delete", false)}
        aria-labelledby="modal-delete-title"
      >
        <MDBox sx={modalStyles}>
          <MDTypography id="modal-delete-title" variant="h4" component="h2" mb={2}>
            Eliminar Usuario
          </MDTypography>
          <MDTypography id="modal-delete-description" variant="body1" mb={2}>
            ¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.
          </MDTypography>
          <MDBox mt={3} display="flex" justifyContent="space-between">
            <Button
              onClick={() => handleModal("delete", false)}
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
              variant="contained"
              onClick={handleDelete}
              sx={{
                ...buttonStyles,
                bgcolor: theme.palette.error.main,
                color: theme.palette.common.white,
                "&:hover": {
                  bgcolor: theme.palette.error.main,
                },
              }}
            >
              Eliminar
            </Button>
          </MDBox>
        </MDBox>
      </Modal>
    </DashboardLayout>
  );
}

export default Overview;
