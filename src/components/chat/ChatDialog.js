import { Box, Dialog, } from "@mui/material"
import Menu from "./menu/Menu";
//Components
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import { useContext } from "react";
import { AuthContext } from "../../context/AccountProvider";


const dialogStyle = {
    height: '95%',
    width: "95%",
    maxWidth: '100%',
    maxHeight: "100%",
    boxShadow: "none",
    overFlow: "hidden",
}


export default function ChatDialog() {
    const { person } = useContext(AuthContext)


    return (
        <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop maxWidth="md">
            <Box sx={{ display: "flex" }}>
                {/* left */}
                <Box sx={{ minWidth: "15rem", width: "35%", height: "100%", m: 0 }}>
                    <Menu />
                </Box>

                {/* right */}
                <Box sx={{ borderLeft: "1px solid #dcdcdc", width: "100%", minWidth: "50rem", height: "100%", overflow: 'hidden' }}>
                    {Object.keys(person).length > 0 ? <ChatBox /> : <EmptyChat />}
                </Box>
            </Box>
        </Dialog>
    )
}
