import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import MaterialAvatarRoot from "./MaterialAvatarRoot";


const MaterialAvatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <MaterialAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

// Typechecking props for the MaterialAvatar
MaterialAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default MaterialAvatar;
