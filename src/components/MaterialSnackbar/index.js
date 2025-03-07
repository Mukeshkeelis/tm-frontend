// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

import MaterialSnackbarIconRoot from "./MaterialSnackbarIconRoot";
import typography from "../../assest/theme/base/typography";
import MaterialBox from "../MaterialBox";
import MaterialTypography from "../MaterialTypography";

import CloseIcon from '@mui/icons-material/Close';


function MaterialSnackbar({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
  const { size } = typography;
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = "dark";
    dateTimeColor = "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
      action={
        <IconButton size="small" color="#000" onClick={close}>
          <Icon fontSize="small"><CloseIcon /></Icon>
        </IconButton>
      }
    >
      <MaterialBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
      >
        <MaterialBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="white"
          p={1.5}
        >
          <MaterialBox display="flex" alignItems="center" lineHeight={0}>
            <MaterialSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </MaterialSnackbarIconRoot>
            <MaterialTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </MaterialTypography>
          </MaterialBox>
          <MaterialBox display="flex" alignItems="center" lineHeight={0}>
            <MaterialTypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </MaterialTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  bgWhite || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              <CloseIcon />
            </Icon>
          </MaterialBox>
        </MaterialBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <MaterialBox p={1.5} color={bgWhite || color === "light" ? "text" : "white"} fontSize={size.sm}>
          {content}
        </MaterialBox>
      </MaterialBox>
    </Snackbar>
  );
}

// Setting default values for the props of MaterialSnackbar
MaterialSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for MaterialSnackbar
MaterialSnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default MaterialSnackbar;
