import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MaterialInput
import { useMaterialUIController } from "../../context";
import MaterialInputRoot from "./MaterialInputRoot";
import MaterialInputWithIconRoot from "./MaterialInputWithIconRoot";
import MaterialInputIconBoxRoot from "./MaterialInputIconBoxRoot";
import MaterialInputIconRoot from "./MaterialInputIconRoot";


const MaterialInput = forwardRef(({ size, icon, error, success, disabled, ...rest }, ref) => {
  let template;
  const [controller] = useMaterialUIController();
  const { direction } = controller;
  const iconDirection = icon.direction;
  const hasInputAdornment = (rest?.startAdornment || rest?.endAdornment) ? rest?.startAdornment ? "start" : "end" : false;

  if (icon.component && icon.direction === "left") {
    template = (
      <MaterialInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <MaterialInputIconBoxRoot ownerState={{ size }}>
          <MaterialInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </MaterialInputIconRoot>
        </MaterialInputIconBoxRoot>
        <MaterialInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
      </MaterialInputWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <MaterialInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <MaterialInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
        <MaterialInputIconBoxRoot ownerState={{ size }}>
          <MaterialInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </MaterialInputIconRoot>
        </MaterialInputIconBoxRoot>
      </MaterialInputWithIconRoot>
    );
  } else {
    template = (
      <MaterialInputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled, hasInputAdornment }} />
    );
  }

  return template;
});

// Setting default values for the props of MaterialInput
MaterialInput.defaultProps = {
  icon: {
    direction: "none",
  },
};

// Typechecking props for the MaterialInput
MaterialInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MaterialInput;
