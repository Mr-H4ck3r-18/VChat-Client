import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useState, useContext } from "react";
import { Menu, MenuItem, Box, IconButton, styled } from '@mui/material';
import { AuthContext } from '../../../../context/AccountProvider';


const MenuOption = styled(MenuItem)`
    padding: 0.5rem 3rem 0.3rem 2rem;
    font-size: 1rem;
    color:"#4a4a4a"
`

export default function HeaderMenu({ toggleDrawer }) {
    const { setAccount, socket } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = () => {
        setAccount(null)
        localStorage.removeItem("user");
        socket.current.disconnect();
    }

    return (
        <Box>
            <IconButton
                id="basic-menu"
                onClick={handleClick}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <MenuOption onClick={() => { handleClose(); toggleDrawer() }}>Profile</MenuOption>
                <MenuOption onClick={handleLogout}>Logout</MenuOption>
            </Menu>
        </Box>
    )
}
