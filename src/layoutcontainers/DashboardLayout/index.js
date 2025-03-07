import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useMaterialUIController, setLayout, setMiniSidenav } from "../../context";
import MaterialBox from "../../components/MaterialBox";
import DashboardFooter from "./components/Footer";
import DashboardNavbar from "./components/Navbar";
import Sidenav from '../../layoutcontainers/DashboardLayout/components/Sidebar';
import logo from '../../assest/images/logo.png'
import routes from '../../routes';

function DashboardLayout({ children }) {
    
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  let permission = sessionStorage.getItem('permission')

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

    useEffect(() => {
        setLayout(dispatch, "dashboard");
    }, [pathname]);

    return (
        <MaterialBox
            sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
                // p: 3,
                position: "relative",

                [breakpoints.up("xl")]: {
                    marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
                    transition: transitions.create(["margin-left", "margin-right"], {
                        easing: transitions.easing.easeInOut,
                        duration: transitions.duration.standard,
                    }),
                },
            })}
        >
            <DashboardNavbar />
            <div style={{ minHeight: "74vh", marginTop: "1rem" }}>
                {children}
            </div>
            <MaterialBox sx={{ paddingTop: theme => `${theme.spacing(9)} !important` }}>
                <DashboardFooter />
            </MaterialBox>
            {layout === "dashboard" && (
                <>
                    <Sidenav
                        color={sidenavColor}
                        brand={logo}
                        brandName="Keelis"
                        // routes={routes.filter(route=>route.allowedRoles.includes(permission))}
                        routes={routes}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />
                </>
            )}
        </MaterialBox>
    );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;