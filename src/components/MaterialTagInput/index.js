import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-tag-input components
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import MaterialTagInputRoot from "./MaterialTagInputRoot";

const MaterialTagInput = forwardRef(({ size, error, success, disabled, ...rest }, ref) => {
  return (
    <MaterialTagInputRoot ownerState={{ size, error, success, disabled }}>
      <ReactTagInput {...rest} ref={ref}
        ownerState={{ size, error, success, disabled }} />
    </MaterialTagInputRoot>
  )
});

// Typechecking props for the MaterialTagInput
MaterialTagInput.propTypes = {
  size: PropTypes.oneOf(["medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MaterialTagInput;
