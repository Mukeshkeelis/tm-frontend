import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import { useTimeline } from "../context";
import MaterialBox from "../../MaterialBox";
import MaterialTypography from "../../MaterialTypography";

import { timelineItem, timelineItemIcon } from "./styles";

function TimelineItem({ color, icon, title, dateTime, description, badges, lastItem }) {
  const isDark = useTimeline();

  return (
    <MaterialBox position="relative" sx={(theme) => timelineItem(theme, { lastItem })}>
      <MaterialBox
        bgColor={color === "success" ? "success" : "error"}
        // bgColor={isDark ? "dark" : "white"}
        width="1.2rem"
        height="1.2rem"
        borderRadius="50%"
        position="absolute"
        top="-50%"
        left="5px"
        zIndex={2}
      >
        <Icon sx={(theme) => timelineItemIcon(theme, { color })}>{icon}</Icon>
      </MaterialBox>
      <MaterialBox ml={5.75} pt={1} lineHeight={0} maxWidth="30rem">
        <MaterialTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </MaterialTypography>
        <MaterialBox mt={0.5}>
          <MaterialTypography
            variant="caption"
            fontWeight="medium"
            color={isDark ? "secondary" : "text"}
          >
            {dateTime}
          </MaterialTypography>
        </MaterialBox>
        <MaterialBox mt={2} mb={1.5}>
          {description ? (
            <MaterialTypography variant="button" fontWeight="regular" color="text">
              {description}
            </MaterialTypography>
          ) : null}
        </MaterialBox>
      </MaterialBox>
    </MaterialBox>
  );
}

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  lastItem: PropTypes.bool,
};

export default TimelineItem;
