import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import MaterialTypographyRoot from "./MaterialTypographyRoot";


const MaterialTypography = forwardRef(
    (
        { color, fontWeight, textTransform, verticalAlign, textGradient, opacity, children, ...rest },
        ref
    ) => (
        <MaterialTypographyRoot
            {...rest}
            ref={ref}
            ownerState={{ color, textTransform, verticalAlign, fontWeight, opacity, textGradient }}
        >
            {children}
        </MaterialTypographyRoot>
    )
);

// Typechecking props for the MaterialTypography
MaterialTypography.propTypes = {
    color: PropTypes.oneOf([
        "inherit",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
        "text",
        "white",
    ]),
    fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
    textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
    verticalAlign: PropTypes.oneOf([
        "unset",
        "baseline",
        "sub",
        "super",
        "text-top",
        "text-bottom",
        "middle",
        "top",
        "bottom",
    ]),
    textGradient: PropTypes.bool,
    children: PropTypes.node.isRequired,
    opacity: PropTypes.number,
};

export default MaterialTypography;
