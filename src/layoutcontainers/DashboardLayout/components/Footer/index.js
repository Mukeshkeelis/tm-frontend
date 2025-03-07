// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

import MaterialBox from "../../../../components/MaterialBox";
import MaterialTypography from "../../../../components/MaterialTypography";
import typography from "../../../../assest/theme/base/typography";
import styled from "@emotion/styled";

function DashboardFooter() {
  const StyledCompanyName = styled(Link)(({ theme }) => ({
    fontWeight: 500,
    textDecoration: 'none',
    color: `${theme.palette.dark.main} !important`
  }))

  return (
    <MaterialBox sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <MaterialTypography variant="body2" sx={{ mr: 2, display: 'flex', color: 'black' }}>
        {`© ${new Date().getFullYear()}, Developed `}
        {/* <Box component='span' sx={{ mx: 1, color: 'error.main' }}>
        ❤️
      </Box> */}
        {`by`}
        <MaterialTypography variant="body2" sx={{ ml: 1 }} target='_blank' href='https://keelis.com/' component={StyledCompanyName}>
          Keel info solution
        </MaterialTypography>
      </MaterialTypography>
    </MaterialBox>
    // <MaterialBox
    //   width="100%"
    //   display="flex"
    //   flexDirection={{ xs: "column", lg: "row" }}
    //   justifyContent="space-between"
    //   alignItems="center"
    //   px={1.5}
    // >
    //   <MaterialBox
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center"
    //     flexWrap="wrap"
    //     color="dark"
    //     fontSize={size.sm}
    //     px={1.5}
    //   >
    //     Developed by
    //       <MaterialTypography variant="button" fontWeight="medium">
    //         &nbsp;{'Keelis'}&nbsp;
    //       </MaterialTypography>
    //   </MaterialBox>
    // </MaterialBox>
  );
}

// Typechecking props for the DashboardFooter
DashboardFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default DashboardFooter;
