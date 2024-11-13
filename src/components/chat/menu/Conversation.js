import { Box, Divider, styled, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AccountProvider";
import { setConversation, getConversation } from '../../../service/api';
import { formatDate } from "../../../util/common-util";


const StyledImg = styled('img')({
    width: 40,
    height: 40,
    borderRadius: '50%',
    p: '0 0.5rem'
})

const Wrapper = styled(Box)`
    align-items:center;
    display:flex;
    padding: 0.65rem;
    gap: 1rem;
`
const Message = styled(Typography)`
    color: #4a4a4a
`

export default function Conversation({ user }) {
    const { setPerson, account, newMsg } = useContext(AuthContext)
    const getUser = async () => {
        setPerson(user)
        await setConversation({ senderId: account.sub, receiverId: user.sub })
    }
    const [msg, setMsg] = useState({ text: '', tmstmp: "" })
    useEffect(() => {
        const getConversationDetails = async () => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub })
            setMsg({ text: data?.message, tmstmp: data?.updatedAt })
        }
        getConversationDetails();
    }, [newMsg])

    return (
        <>
            <Wrapper onClick={() => getUser()}>
                <StyledImg src={user.picture} alt="pic" />
                <Box sx={{ width: "100%" }}>
                    <Typography>{user.given_name}</Typography>
                    <Box sx={{ display: "flex" }}>
                        <Message>{msg?.text && msg?.text?.includes("localhost") ? 'media' : msg.text}</Message>
                        <Typography sx={{ ml: "auto", fontSize: "12px", color: "#00000099" }}>{msg?.text && formatDate(msg.tmstmp)}</Typography>
                    </Box>
                </Box>
            </Wrapper>
            <Divider sx={{ m: "0 0 0 3.7rem", bgcolor: "#e9edef", opacity: "0.6" }} />
        </>
    )
}
