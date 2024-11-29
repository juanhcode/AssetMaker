import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";

function Header({ children, userName = "", isLoading = false }) {
  const [tabsOrientation, setTabsOrientation] = useState(
    window.innerWidth < breakpoints.values.sm ? "vertical" : "horizontal"
  );

  useEffect(() => {
    function handleTabsOrientation() {
      const newOrientation = window.innerWidth < breakpoints.values.sm ? "vertical" : "horizontal";
      if (newOrientation !== tabsOrientation) {
        setTabsOrientation(newOrientation);
      }
    }

    window.addEventListener("resize", handleTabsOrientation);
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
            )}
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              {isLoading ? (
                <>
                  <Skeleton width={70} height={20} />
                  <Skeleton width={70} height={20} />
                </>
              ) : (
                <>
                  <MDTypography variant="h4" fontWeight="medium">
                    {userName}
                  </MDTypography>
                  <MDTypography variant="h5" color="text" fontWeight="regular">
                    Inversor
                  </MDTypography>
                </>
              )}
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

Header.propTypes = {
  children: PropTypes.node,
  userName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Header;
