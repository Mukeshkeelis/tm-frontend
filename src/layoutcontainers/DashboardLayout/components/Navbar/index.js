import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";

import MaterialBox from "../../../../components/MaterialBox";
import { setMiniSidenav, setTransparentNavbar, useMaterialUIController, setPopup, setLoader } from "../../../../context";
import { navbarContainer, navbar, navbarRow } from "./styles";
import Breadcrumbs from "./components/Breadcrumbs";
import NotificationItem from "./components/NotificationItem";
import MaterialAvatar from "../../../../components/MaterialAvatar";
import { Avatar } from "@mui/material";
import stringAvatar from "../../../../functions/stringAvatar";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut, postData } from "../../../../pages/Utils/Baseurl";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const [user, setUser] = useState({
    name: "",
    picture: "",
    email: "",
    permission: ''
  });

  const [pageState, setPageState] = useState({
    state: 'init'
  });
  console.log('pageState:', pageState);
  useEffect(() => {
    const getUser = () => {

      const username = sessionStorage.getItem('username')
      const email = sessionStorage.getItem('email')
      const permission = sessionStorage.getItem('permission')


      setUser({
        name: username,
        email: email,
        picture: user.picture,
        permission: permission
      })
      setPageState({
        state: 'default'
      })
    }
    getUser()
  }, [])

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const navigate = useNavigate();
  const open = Boolean(openMenu)
  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}

    >
      <div>
        <NotificationItem icon={
          <>
            {
              user.picture ?
                <Avatar alt={user.name} src={user.picture} sx={{ width: 24, height: 24 }} />
                :
                <>
                  <MaterialAvatar
                    size="sm"
                    {
                    ...stringAvatar(user.name || user.email || "UNNAMED")

                    }
                  />
                </>

            }
          </>
        }
          title={user.name || user.email}
          role={user.permission}

        />

      </div>


      <NotificationItem id="logout" onClick={signOut} icon={<LogoutIcon />} title={"Logout"} />
    </Menu>
  );

  const signOut = async () => {
    setLoader(dispatch, true)
    try {

      // let refresh = sessionStorage.getItem('refresh')

      // let response = await logOut('/logout/', {refresh})

      setLoader(dispatch, false)
      setPopup(dispatch, {message: 'Logged out successfully', mode: 'success'})

      sessionStorage.clear()
      navigate('/sign-in')
    }
    catch (err) {
      console.log(err)
      setLoader(dispatch, false)
      setPopup(dispatch, {message: 'Failed to logged out', mode: 'error'})
    }

  }

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      // position="navbarType"
      color="inherit"
    // sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        {
          pageState.state === 'default' && (
            <>
              <MaterialBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}  >
                <MaterialBox display="flex" >
                  <Icon fontSize="medium" onClick={handleMiniSidenav} sx={{ cursor: "pointer" }}>
                    {miniSidenav ? <MenuOpenIcon /> : <MenuIcon />}
                  </Icon>
                  <MaterialBox ml={1}>
                    <Breadcrumbs icon={<HomeIcon />} title={route[route.length - 1]} route={route} light={light} />
                  </MaterialBox>
                </MaterialBox>
              </MaterialBox>
              {isMini ? null : (
                <MaterialBox sx={(theme) => navbarRow(theme, { isMini })}>
                  <IconButton
                    onClick={handleOpenMenu}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <MaterialAvatar alt={user.name} src={user.picture} sx={{ width: 35, height: 35 }} />
                  </IconButton>
                  {renderMenu()}
                </MaterialBox>
              )}
            </>
          )
        }
      </Toolbar>
    </AppBar>
  );
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
