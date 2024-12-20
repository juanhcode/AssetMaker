import React from "react";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Skeleton from "@mui/material/Skeleton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ProfileInfoCard({ title, description, info, actions, shadow, isLoading }) {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);
      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      {isLoading ? (
        <Skeleton width="100%" />
      ) : (
        <>
          <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
            {label}: &nbsp;
          </MDTypography>
          <MDTypography variant="h5" fontWeight="regular" color="text">
            &nbsp;{values[key]}
          </MDTypography>
        </>
      )}
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDBox>
          {actions.map(({ onClick, tooltip, icon }, index) => (
            <Tooltip key={index} title={tooltip} placement="top">
              <IconButton onClick={onClick} sx={{ fontSize: "2rem", padding: "12px" }}>
                <Icon>{icon}</Icon>
              </IconButton>
            </Tooltip>
          ))}
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          {isLoading ? (
            <Skeleton width="100%" />
          ) : (
            <MDTypography variant="h5" color="text" fontWeight="light">
              {description}
            </MDTypography>
          )}
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox> {renderItems} </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
  isLoading: false,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      tooltip: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  shadow: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ProfileInfoCard;
