import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    Nombre: "Christian",
    Móvil: "1234567890",
    Email: "prueba@gmail.com",
    Ubicación: "colombia",
    Descripción: "Este es mi perfil",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDelete = () => {
    setProfileData({
      Nombre: "",
      Móvil: "",
      Email: "",
      Ubicación: "",
      Descripción: "",
    });
    handleDeleteClose();
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
    handleClose();
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
                    onClick: handleOpen,
                    tooltip: "Actualizar Usuario",
                    icon: "edit",
                  },
                  {
                    onClick: handleDeleteOpen,
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
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Proyectos
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
          <MDTypography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Actualizar Usuario
          </MDTypography>
          <MDBox component="form">
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              name="Nombre"
              value={profileData.Nombre}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Móvil"
              name="Móvil"
              value={profileData.Móvil}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="Email"
              value={profileData.Email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Ubicación"
              name="Ubicación"
              value={profileData.Ubicación}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Descripción"
              name="Descripción"
              value={profileData.Descripción}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <MDBox mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Guardar
              </Button>
            </MDBox>
          </MDBox>
        </MDBox>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-delete-title"
        aria-describedby="modal-delete-description"
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
          <MDTypography id="modal-delete-title" variant="h6" component="h2" mb={2}>
            Eliminar Usuario
          </MDTypography>
          <MDTypography id="modal-delete-description" variant="body1" mb={2}>
            ¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.
          </MDTypography>
          <MDBox mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleDeleteClose} color="secondary" sx={{ mr: 1 }}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
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
