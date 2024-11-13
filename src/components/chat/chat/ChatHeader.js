import { Box, styled, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

import { useContext } from "react";
import { AuthContext } from "../../../context/AccountProvider";


const Image = styled('img')({
    width: 35,
    height: 35,
    borderRadius: "50%",
    mt: '1rem'
})

const Container = styled(Box)`
    display: flex;
    background-color: #dcdcdc ;
    padding: 0.3rem 1rem;
    align-items: center;
    height:44px;
`

const Name = styled(Typography)`
    margin-left: 0.65rem !important;
`
const Status = styled(Typography)`
    margin-left: 0.65rem !important;
    font-size: 0.9rem;
    opacity:0.6;
`

export default function ChatHeader({ person }) {
    const { activeUsers } = useContext(AuthContext);

    return (
        <Container>
            <Box sx={{ display: 'flex' }}>
                <Image src={person.picture} alt="Profile pic" />
                <Box>
                    <Name>{person.given_name}</Name>
                    <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'Online' : "Offline"}</Status>
                </Box>
            </Box>
            <Box sx={{ marginLeft: "auto" }}>
                <Search />
            </Box>
        </Container>
    )
}
