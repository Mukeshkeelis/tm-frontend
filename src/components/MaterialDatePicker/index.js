// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

import MaterialInput from "../MaterialInput";

function MaterialDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <MaterialInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

// Typechecking props for the MaterialDatePicker
MaterialDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default MaterialDatePicker;
