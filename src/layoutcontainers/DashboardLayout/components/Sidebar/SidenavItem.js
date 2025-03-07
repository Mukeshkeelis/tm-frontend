// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import { useMaterialUIController } from "../../../../context";
import MaterialBox from "../../../../components/MaterialBox";
import { itemContent, item, itemArrow } from "./styles/sidenavItems";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SidenavItem({ color, name, active, nested, children, open, ...rest }) {
    const [controller] = useMaterialUIController();
    const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;

    return (
        <>
            {/* <ListItem {...rest} component="li" sx={(theme) => item(theme, { active, color, transparentSidenav, whiteSidenav, darkMode })}> */}
            <MaterialBox sx={(theme) => itemContent(theme, { active, miniSidenav, name, nested })}>
                <ListItemText primary={name} />
                {children && (
                    <Icon component="i" sx={(theme) => itemArrow(theme, { open, miniSidenav })}>
                        <ExpandMoreIcon />
                    </Icon>
                )}
            </MaterialBox>
            {/* </ListItem> */}
            {children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            )}
        </>
    );
}

// Typechecking props for the SidenavItem
SidenavItem.propTypes = {
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    nested: PropTypes.bool,
    children: PropTypes.node,
    open: PropTypes.bool,
};

export default SidenavItem;
