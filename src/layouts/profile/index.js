import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import Header from "layouts/profile/components/Header";
import profilesListData from "layouts/profile/data/profilesListData";

function Overview() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({ update: false, delete: false });
  const [profileData, setProfileData] = useState({
    Nombre: "Christian",
    Móvil: "1234567890",
    Email: "prueba@gmail.com",
    Ubicación: "colombia",
    Descripción: "Este es mi perfil",
  });

  const handleModal = (modal, state) => {
    setOpenModal((prev) => ({ ...prev, [modal]: state }));
  };

  const handleDelete = () => {
    setProfileData({
      Nombre: "",
      Móvil: "",
      Email: "",
      Ubicación: "",
      Descripción: "",
    });
    handleModal("delete", false);
    handleLogout();
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    handleModal("update", false);
  };

  const textFieldProps = {
    fullWidth: true,
    margin: "normal",
    onChange: handleChange,
    InputProps: {
      sx: { fontSize: "1.2rem" },
    },
    InputLabelProps: {
      sx: { fontSize: "1.2rem" },
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header userName={profileData.Nombre}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileInfoCard
                title="Información del perfil"
                description={profileData.Descripción}
                info={{
                  Nombre: profileData.Nombre,
                  Móvil: profileData.Móvil,
                  Email: profileData.Email,
                  Ubicación: profileData.Ubicación,
                }}
                social={[]}
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
              />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
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
        <MDBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MDTypography id="modal-update-title" variant="h4" component="h2" mb={2}>
            Actualizar Usuario
          </MDTypography>
          <MDBox component="form">
            {["Nombre", "Móvil", "Email", "Ubicación", "Descripción"].map((field) => (
              <TextField
                key={field}
                label={field}
                name={field}
                value={profileData[field]}
                {...textFieldProps}
                multiline={field === "Descripción"}
                rows={field === "Descripción" ? 4 : 1}
              />
            ))}
            <MDBox mt={2} display="flex" justifyContent="flex-end">
              <Button
                onClick={() => handleModal("update", false)}
                color="secondary"
                sx={{ mr: 1, fontSize: "1rem" }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ color: (theme) => theme.palette.common.white, fontSize: "1rem" }}
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
        <MDBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MDTypography id="modal-delete-title" variant="h4" component="h2" mb={2}>
            Eliminar Usuario
          </MDTypography>
          <MDTypography id="modal-delete-description" variant="body1" mb={2}>
            ¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.
          </MDTypography>
          <MDBox mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={() => handleModal("delete", false)}
              color="secondary"
              sx={{ mr: 1, fontSize: "1rem" }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelete}
              sx={{ color: (theme) => theme.palette.common.white, fontSize: "1rem" }}
            >
              Eliminar
            </Button>
          </MDBox>
        </MDBox>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
