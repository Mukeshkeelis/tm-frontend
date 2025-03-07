import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-select components
import Select from "react-select";

import colors from "../../assest/theme/base/colors";
import styles from "./styles";

const MaterialSelect = forwardRef(({ size, error, success, customStyles, ...rest }, ref) => {
  const { light, background, text, gradients } = colors;

  return (
    <Select
      {...rest}
      disabled={true}
      ref={ref}
      styles={styles(size, error, success, customStyles)}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: gradients.dark.main,
          primary: gradients.dark.state,
        },
      })}
    />
  );
});

// Typechecking props for the MaterialSelect
MaterialSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
  onChange: PropTypes.func,
};

export default MaterialSelect;
