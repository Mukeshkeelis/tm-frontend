import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialAvatar from "../../../../components/MaterialAvatar";
import MaterialBox from "../../../../components/MaterialBox";
import NotificationItem from "../../../DashboardLayout/components/Navbar/components/NotificationItem";
import stringAvatar from "../../../../functions/stringAvatar";


function Navbar() {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState({
        name: "Ashwin",
        email: ""
    });

    useEffect(() => {
        const getUser = () => {
            setUser({
                name: user.name,
                email: user.email
            })
        }
        getUser()
    }, [])


    const handleClose = () => {
        console.log("close")
        setAnchorEl(null);
    }

    const signOut = () => {
        navigate("/")
    }

    const handleClick = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    }

    return (
        <MaterialBox style={{
            width: "100%",
            // backgroundColor: "red",
            padding: "0",
            margin: "0",
            zIndex: 2,
        }}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ pt: 2, pr: 2, pl: 2, pb: 0 }} >
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={anchorEl ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorEl ? 'true' : undefined}
                >
                    <MaterialAvatar
                        size="sm"
                        {
                        ...stringAvatar(user.name || user.email || "UNNAMED")
                        }
                    />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={anchorEl ? true : false}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <NotificationItem icon={
                        <>
                            {
                                user.picture ?
                                    <Avatar alt={user.name} src={user.picture} sx={{ width: 24, height: 24 }} />
                                    :
                                    <MaterialAvatar
                                        size="xs"
                                        {
                                        ...stringAvatar(user.name || user.email || "UNNAMED")
                                        }
                                    />
                            }
                        </>
                    } title={user.name || user.email} />
                    <NotificationItem id="logout" onClick={signOut} icon={<Logout />} title={"Logout"} />
                </Menu>
            </Stack>
        </MaterialBox>
    )
}

export default Navbar