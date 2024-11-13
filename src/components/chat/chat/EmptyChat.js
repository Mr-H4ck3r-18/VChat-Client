import { Box, styled, Typography } from "@mui/material";



const Wrapper = styled(Box)`
    background:#f8f9fa;
    height:87.7vh;
    padding: 30px 0;
    text-align:center;
`
const Image = styled('img')({
    width: 400,
    marginTop: 150,
})

const Title = styled(Typography)`
    font-size: 2.3rem;
    color: #41525d;
    margin: 1.56rem 0 0.62rem 0;
    font-family: inherit;
`

const Subtitle = styled(Typography)`
    font-size: 1rem;
    color: #667781;
    font-weight:400;
    font-family: inherit;
`

export default function EmptyChat() {
    const emptyChatImage = 'https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg'
    return (
        <Wrapper>
            <Box sx={{ p: "0 20rem" }}>
                <Image src={emptyChatImage} alt="pic" />
                <Title>VChat Live</Title>
                <Subtitle>Private Chating app with media transfer enabled.</Subtitle>
            </Box>
        </Wrapper>
    )
}
