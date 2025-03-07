// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

import colors from "../../assest/theme/base/colors";
import borders from "../../assest/theme/base/borders";
import MaterialBox from "../MaterialBox";

/**
 * MaterialTableHeadCell is a component that displays a MaterialBox with
 * a smaller font size and uppercase text. It can be used to create a
 * table header cell that displays a MaterialBox with a smaller font
 * size and uppercase text.
 *
 * @param {{ width: string, children: node, sorted: boolean|string, align: string }} props
 * @prop {string} width The width of the MaterialBox.
 * @prop {node} children The content of the MaterialBox.
 * @prop {boolean|string} sorted Whether the MaterialBox should be sorted.
 * @prop {string} align The alignment of the MaterialBox.
 * @returns {React.ReactElement} The MaterialTableHeadCell component.
 */
function MaterialTableHeadCell({ width, children, sorted, align, ...rest }) {
  const { light } = colors;
  const { borderWidth } = borders;

  return (
    <MaterialBox
      component="th"
      width={width}
      borderBottom={`${borderWidth[1]} solid ${light.main}`}
      py={1.5}
      px={3}
    >
      <MaterialBox
        {...rest}
        position="relative"
        textAlign={align}
        color="text"
        // opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }) => ({
          fontSize: size.xs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none",
        })}
      >
        {children}
        {sorted && (
          <MaterialBox
            position="absolute"
            top={0}
            right={align !== "right" ? "16px" : 0}
            left={align === "right" ? "-5px" : "unset"}
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            <MaterialBox
              position="absolute"
              top={-6}
              color={sorted === "asce" ? "text" : "secondary"}
              opacity={sorted === "asce" ? 1 : 0.5}
            >
              <Icon>arrow_drop_up</Icon>
            </MaterialBox>
            <MaterialBox
              position="absolute"
              top={0}
              color={sorted === "desc" ? "text" : "secondary"}
              opacity={sorted === "desc" ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </MaterialBox>
          </MaterialBox>
        )}
      </MaterialBox>
    </MaterialBox>
  );
}

// Typechecking props for the MaterialTableHeadCell
MaterialTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default MaterialTableHeadCell;
