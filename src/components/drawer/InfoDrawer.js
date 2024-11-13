import { Drawer } from "@mui/material";


const styledDrawer = {
    left: 37,
    top: 22,
    height: "95%",
    width: "30%",
    boxShadow: "none"

}

export default function InfoDrawer({ open, toggleDrawer, children }) {
    return (
        <>
            <Drawer
                open={open}
                onClose={toggleDrawer}
                PaperProps={{ sx: styledDrawer }}
                style={{ zIndex: 1500 }}
            >
                {children}
            </Drawer>
        </>
    )
}
