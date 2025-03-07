// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import colors from "../../assest/theme/base/colors";
import typography from "../../assest/theme/base/typography";
import borders from "../../assest/theme/base/borders";
import MaterialBox from "../MaterialBox";

/**
 * MaterialTableBodyCell is a component that renders a table cell
 * with customizable border and text alignment. It uses MaterialBox
 * as the underlying component to provide consistent styling.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} [props.noBorder=false] - If true, removes the bottom border of the cell.
 * @param {"left"|"right"|"center"} [props.align="left"] - The text alignment within the cell.
 * @param {React.ReactNode} props.children - The content to be displayed within the cell.
 * @returns {React.ReactElement} The MaterialTableBodyCell component.
 */

function MaterialTableBodyCell({ noBorder, align, children }) {
  const { light } = colors;
  const { size } = typography;
  const { borderWidth } = borders;

  return (
    <MaterialBox
      component="td"
      textAlign={align}
      fontSize={size.sm}
      borderBottom={noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`}
      py={1.5}
      px={3}
    >
      <MaterialBox
        display="inline-block"
        width="max-content"
        color="black"
        sx={{ verticalAlign: "middle" }}
      >
        {children}
      </MaterialBox>
    </MaterialBox>
  );
}

// Typechecking props for the MaterialTableBodyCell
MaterialTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default MaterialTableBodyCell;
