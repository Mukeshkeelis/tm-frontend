import { forwardRef } from "react";
import PropTypes from "prop-types";
import MaterialLoadingButtonRoot from "./MaterialLoadingButtonRoot";

const MaterialLoadingButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, loading, loadingPosition, ...rest }, ref) => (
    <MaterialLoadingButtonRoot
      {...rest}
      ref={ref}
      color="primary"
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
      loading={loading}
      loadingPosition={loadingPosition}
    >
      {children}
    </MaterialLoadingButtonRoot>
  )
);

// Typechecking props for the MaterialLoadingButton
MaterialLoadingButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  loadingPosition: PropTypes.oneOf(["start", "center"]),
};

export default MaterialLoadingButton;