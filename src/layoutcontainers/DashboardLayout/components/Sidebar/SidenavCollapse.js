// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import { collapseArrow, collapseIcon, collapseIconBox, collapseItem, collapseText } from "./styles/sidenavCollapse";
import { useMaterialUIController } from "../../../../context";
import MaterialBox from "../../../../components/MaterialBox";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function SidenavCollapse({ color, icon, iconType, name, children, active, noCollapse, open, ...rest }) {
    const [controller] = useMaterialUIController();
    const { miniSidenav, transparentSidenav, whiteSidenav, sidenavColor, darkMode } = controller;

    return (
        <>
            <ListItem component="li">
                <MaterialBox
                    {...rest}
                    sx={(theme) =>
                        collapseItem(theme, { active, transparentSidenav, whiteSidenav, darkMode })
                    }

                >
                    <ListItemIcon
                        sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, sidenavColor })}
                        style={{
                            opacity: 1,
                        }}
                    >
                        {
                            <>
                                {typeof icon === "string" ? (
                                    <Icon sx={(theme) => collapseIcon(theme, { active })} style={{
                                        opacity: 1,
                                    }}>{icon}</Icon>
                                ) : (
                                    icon
                                )}
                            </>
                        }
                    </ListItemIcon>

                    <ListItemText
                        primary={name}
                        sx={(theme) =>
                            collapseText(theme, {
                                miniSidenav,
                                transparentSidenav,
                                whiteSidenav,
                                active,
                            })
                        }
                    />

                    <Icon
                        sx={(theme) =>
                            collapseArrow(theme, { noCollapse, transparentSidenav, miniSidenav, open })
                        }
                    >
                        <ExpandLessIcon />
                    </Icon>
                </MaterialBox>
            </ListItem >
            {children && (
                <Collapse in={open} unmountOnExit>
                    {children}
                </Collapse>
            )
            }
        </>
    );
}

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    icon: PropTypes.node.isRequired,
    iconType: PropTypes.string,
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    active: PropTypes.bool,
    noCollapse: PropTypes.bool,
    open: PropTypes.bool,
};

export default SidenavCollapse;
