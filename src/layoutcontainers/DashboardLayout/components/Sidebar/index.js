import { useEffect, useState } from "react";

// react-router-dom components
import { NavLink, Router, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import List from "@mui/material/List";


import SidenavItem from "./SidenavItem";
import SidenavList from "./SidenavList";
import SidenavRoot from "./SidenavRoot";

import MaterialBox from "../../../../components/MaterialBox";
import MaterialTypography from "../../../../components/MaterialTypography";
import { setMiniSidenav, useMaterialUIController } from "../../../../context";
import SidenavCollapse from "./SidenavCollapse";
import sidenavLogoLabel from "./styles/sidenav";

import CloseIcon from '@mui/icons-material/Close';

function Sidenav({ color, brand, brandName, routes, ...rest }) {
    const [openCollapse, setOpenCollapse] = useState(false);
    const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
    const location = useLocation();
    const { pathname } = location;
    const collapseName = pathname.split("/").slice(1)[0];
    const itemName = pathname.split("/").slice(1)[1];

    let textColor = "white";

    if (transparentSidenav || (whiteSidenav && !darkMode)) {
        textColor = "dark";
    } else if (whiteSidenav && darkMode) {
        textColor = "inherit";
    }

    const closeSidenav = () => setMiniSidenav(dispatch, true);

    useEffect(() => {
        // A function that sets the mini state of the sidenav.
        function handleMiniSidenav() {
            setMiniSidenav(dispatch, window.innerWidth < 1200);
        }
        window.addEventListener("resize", handleMiniSidenav);
        handleMiniSidenav();
        return () => window.removeEventListener("resize", handleMiniSidenav);
    }, [dispatch, location]);

    // Render all the nested collapse items from the routes.js
    const renderNestedCollapse = (collapse) => {
        const template = collapse.map(({ name, route, key, href }) =>
            href ? (
                <Link
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ textDecoration: "none" }}
                >
                    <SidenavItem name={name} nested />
                </Link>
            ) : (
                <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
                    <SidenavItem name={name} active={route === pathname} nested />
                </NavLink>
            )
        );

        return template;
    };

    // Render the all the collpases from the routes.js
    const renderCollapse = (collapses) =>
        collapses.map(({ name, isDevPage, collapse, route, href, key }) => {
            let returnValue;

            if (collapse) {
                returnValue = (
                    <SidenavItem
                        key={key}
                        color={color}
                        name={name}
                        active={key === itemName}
                        open={openNestedCollapse === name}
                        onClick={() =>
                            openNestedCollapse === name
                                ? setOpenNestedCollapse(false)
                                : setOpenNestedCollapse(name)
                        }
                    >
                        {renderNestedCollapse(collapse)}
                    </SidenavItem>
                );
            } else if (isDevPage === true) {

            } else {
                returnValue = href ? (
                    <Link
                        href={href}
                        key={key}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ textDecoration: "none" }}
                    >
                        <SidenavItem color={color} name={name} active={key === itemName} />
                    </Link>
                ) : (
                    <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
                        <SidenavItem color={color} name={name} active={key === itemName} />
                    </NavLink>
                );
            }
            return <SidenavList key={key}>{returnValue}</SidenavList>;
        });

    // Render all the routes from the routes.js (All the visible items on the Sidenav)

    const permission = sessionStorage.getItem('permission')

    const filteredRoutes = permission ? routes.filter(route=>route.allowedRoles?.includes(permission)) : []

    const renderRoutes = filteredRoutes.map(
        ({ type, name, icon, iconType, title, collapse, noCollapse, key, href, route, hidden }) => {
            let returnValue;

            // console.log("Type: " + type);
            if (hidden) return null;
            if (type === "collapse") {
                if (href) {
                    returnValue = (
                        <Link
                            href={href}
                            key={key}
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                                textDecoration: "none"
                            }}
                        >
                            <SidenavCollapse
                                iconType={iconType}
                                name={name}
                                icon={icon}
                                active={key === collapseName}
                                noCollapse={noCollapse}
                            />
                        </Link>
                    );
                }
                else if (noCollapse && route) {
                    // console.log("check me: ", key, collapseName)
                    returnValue = (
                        <NavLink to={route} key={key}>
                            <SidenavCollapse
                                iconType={iconType}
                                name={name}
                                icon={icon}
                                noCollapse={noCollapse}
                                active={key === collapseName}
                            >
                                {collapse ? renderCollapse(collapse) : null}
                            </SidenavCollapse>
                        </NavLink>
                    );

                }
                else {
                    returnValue = (
                        <SidenavCollapse
                            iconType={iconType}
                            key={key}
                            name={name}
                            icon={icon}
                            active={key === collapseName}
                            open={openCollapse === key}
                            noCollapse={noCollapse}
                            onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
                        >
                            {collapse ? renderCollapse(collapse) : null}
                        </SidenavCollapse>
                    );
                }

            } else if (type === "title") {
                returnValue = (
                    <MaterialTypography
                        key={key}
                        color={textColor}
                        display="block"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="uppercase"
                        opacity={0.6}
                        pl={3}
                        mt={2}
                        mb={1}
                        ml={1}
                    >
                        {title}
                    </MaterialTypography>
                );
            } else if (type === "divider") {
                returnValue = <Divider key={key} />;
            }
            return returnValue;
        }
    );

    return (
        <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}>
            <MaterialBox
                pt={3} pb={1} px={4}
                textAlign="center"
            >
                <MaterialBox
                    display={{ xs: "block", xl: "none" }}
                    position="absolute"
                    top={0}
                    right={0}
                    p={1.625}
                    onClick={closeSidenav}
                    sx={{ cursor: "pointer" }}
                >
                    <MaterialTypography variant="h6" color="secondary">
                        <Icon sx={{ fontWeight: "bold" }}>
                            <CloseIcon />
                        </Icon>
                    </MaterialTypography>
                </MaterialBox>
                <MaterialBox component={NavLink} to="/" display="flex" alignItems="center">
                    {brand && <MaterialBox component="img" src={brand} alt="Logo" width="2rem" />}
                    <MaterialBox
                        width={!brandName && "100%"}
                        sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
                    >
                        <MaterialTypography component="h6" variant="button" fontWeight="medium">
                            {brandName}
                        </MaterialTypography>
                    </MaterialBox>
                </MaterialBox>
            </MaterialBox>
            {/* <Divider /> */}
            <List>{renderRoutes}</List>

        </SidenavRoot>
    );
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    brand: PropTypes.string,
    brandName: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
