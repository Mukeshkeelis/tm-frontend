import { forwardRef } from "react";
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

import { menuItem, menuImage } from "./styles";
import MaterialBox from "../../../../../../components/MaterialBox";
import MaterialTypography from "../../../../../../components/MaterialTypography";

const NotificationItem = forwardRef(({ icon, title, role, ...rest }, ref) => (
  <>
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <MaterialBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <MaterialTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </MaterialTypography>
      <MaterialTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title} 
    <div style={{fontSize:'12px', marginTop:'5px'}}>
      {role}
    </div>
      </MaterialTypography>
    </MaterialBox>
   
  </MenuItem>

 </>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default NotificationItem;
