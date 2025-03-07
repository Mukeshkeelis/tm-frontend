import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import MaterialBox from "../../components/MaterialBox";
import { setLayout, useMaterialUIController } from "../../context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function PageLayout({ background, children, disableFooter, showNavbar, height, minHeight, addPadding }) {
    const [, dispatch] = useMaterialUIController();
    const { pathname } = useLocation();

    useEffect(() => {
        setLayout(dispatch, "page");
    }, [pathname]);

    return (
        <>
            {
                !showNavbar && (
                    <Navbar />
                )
            }
            <MaterialBox
                width="100%"
                height={height ? height : '85vh'}
                minHeight={minHeight}
                bgColor={background}
                sx={addPadding ? { pl: 5, pr: 5, pt: 2, pb: 5, overflowX: "hidden", } : { overflowX: "hidden" }}
            >
                {children}
            </MaterialBox >
            {
                !disableFooter && (
                    <Footer />
                )
            }
        </>
    );
}

// Typechecking props for the PageLayout
PageLayout.propTypes = {
    background: PropTypes.oneOf(["white", "light", "default"]),
    children: PropTypes.node.isRequired,
    disableFooter: PropTypes.bool,
    height: PropTypes.string,
    minHeight: PropTypes.string,
    addPadding: PropTypes.bool,
};

export default PageLayout;
