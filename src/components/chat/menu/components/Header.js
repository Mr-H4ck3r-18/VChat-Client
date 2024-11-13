import { Box, IconButton, styled, Typography, } from "@mui/material";

import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import HeaderMenu from "./HeaderMenu";
import { useContext, useState } from "react";
import InfoDrawer from "../../../drawer/InfoDrawer";
import { AuthContext } from "../../../../context/AccountProvider";


const Image = styled('img')({
    width: 30,
    height: 30,
    borderRadius: "50%"
})

const ProfilePic = styled('img')({
    width: 250,
    height: 250,
    borderRadius: "50%"
})

const HeaderWrapper = styled(Box)`
    background : #5a990f;
    display : flex;
    opacity : 90%;
    height : 17%;
    & > svg, & > p{
        color : #ffffff;
        margin-top : auto;
        padding : 0.8rem;
        font-weight : 600;
    }
`
const ProfleDetails = styled(Box)`
    background: #ffffff;
    height: 5rem;
    width: 100%; 
    margin-top: 2rem;
    padding: 1rem; 
    & : last-child{
        margin: 1rem 0;
        color: #4a4a4a
    }
`

export default function Header({ image }) {
    const pic = String(image) || 'fallbackProfile.png'
    const { account } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const toggleDrawer = () => {
        setOpen(!open)
    }
    const imge = <Image src={pic} alt="Profile pic" onClick={toggleDrawer} />
    const profilePic = <ProfilePic src={pic} alt="Profile pic" onClick={toggleDrawer} />

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#dcdcdc", p: '0.3rem 1rem', alignItems: "center", height: "44px" }}>
                <Box>
                    {imge}
                </Box>
                <Box sx={{ display: "flex" }}>
                    <IconButton>
                        <MapsUgcOutlinedIcon />
                    </IconButton>
                    <HeaderMenu toggleDrawer={toggleDrawer} />
                </Box>
            </Box>
            <InfoDrawer open={open} toggleDrawer={toggleDrawer}>
                <HeaderWrapper>
                    <ArrowBackOutlinedIcon onClick={toggleDrawer} />
                    <Typography >Profile</Typography>
                </HeaderWrapper>
                <Box sx={{ justifyItems: "center", p: "2rem", background: "#f5f5f5", height: "100%" }}>
                    <Box>
                        {profilePic}
                    </Box>
                    <ProfleDetails>
                        <Typography sx={{ color: "#5a990f", fontWeight: 200 }}>User Name</Typography>
                        <Typography>{account.given_name}</Typography>
                    </ProfleDetails>
                </Box>
            </InfoDrawer>
        </>
    )
}
