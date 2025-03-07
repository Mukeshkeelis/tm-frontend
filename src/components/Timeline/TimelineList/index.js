import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

import MaterialBox from "../../MaterialBox";
import MaterialTypography from "../../MaterialTypography";
import { TimelineProvider } from "../context";

function TimelineList({ title, dark, children }) {
  return (
    <TimelineProvider value={dark}>
      <Card>
        <MaterialBox bgColor={dark ? "dark" : "white"} variant="gradient">
          <MaterialBox pt={3} px={3}>
            <MaterialTypography variant="h6" fontWeight="medium" color={dark ? "white" : "dark"}>
              {title}
            </MaterialTypography>
          </MaterialBox>
          <MaterialBox p={2}>{children}</MaterialBox>
        </MaterialBox>
      </Card>
    </TimelineProvider>
  );
}

// Typechecking props for the TimelineList
TimelineList.propTypes = {
  title: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default TimelineList;
