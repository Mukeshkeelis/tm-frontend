// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import MaterialBox from "../MaterialBox";
import MaterialTypography from "../MaterialTypography";
import MaterialAvatar from "../MaterialAvatar";

/**
 * MaterialImageCell is a component that displays a rounded MaterialAvatar
 * and a MaterialTypography next to it. It is used to display a user image
 * and name in a MaterialTable.
 *
 * @param {{ image: string, name: string }} props
 * @prop {string} image The url of the avatar image.
 * @prop {string} name The name to be displayed next to the avatar.
 * @returns {React.ReactElement} The MaterialImageCell component.
 */
function MaterialImageCell({ image, name }) {
  return (
    <MaterialBox display="flex" alignItems="center" pr={2}>
      <MaterialBox mr={2}>
        <MaterialAvatar src={image} alt={name} variant="rounded" />
      </MaterialBox>
      <MaterialTypography variant="button" fontWeight="medium">
        {name}
      </MaterialTypography>
    </MaterialBox>
  );
}

// Typechecking props for the MaterialImageCell
MaterialImageCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MaterialImageCell;
