import { Box, Typography, styled } from "@mui/material"
import { formatDate, downloadMedia } from "../../../util/common-util"

import GetAppIcon from '@mui/icons-material/GetApp';


const iconPDF = 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png';

const Own = styled(Box)`
    background:#dcf8c6;
    max-width:60%;
    margin-left:auto;
    padding:5px;
    width:fit-content;
    display:flex;
    border-radius:1rem;
    word-break;break-word;
`
const Received = styled(Box)`
    background:#FFFFFF;
    max-width:60%;
    padding:5px;
    width:fit-content;
    display:flex;
    border-radius:1rem;
    word-break;break-word;
`;

const Text = styled(Typography)`
    font-size:14px;
    padding: 0 25px 0 5px;
`

const Time = styled(Typography)`
    color:#919191;
    font-size:10px;
    margin-top:auto;
    word-break:keep-all;


`

export default function Message({ message, sender }) {
    return (
        <>
            {
                sender === message.senderId ?
                    <Own>
                        <MessageContent message={message} />
                    </Own>
                    :
                    <Received>
                        <MessageContent message={message} />
                    </Received>
            }
        </>
    )
}

const MessageContent = ({ message }) => {
    return (
        <>
            {message.type === 'text' ? (
                <>
                    <Text>{message.text}</Text >
                    <Time>{formatDate(message.createdAt)}</Time>
                </>
            ) : (
                <>
                    <Box sx={{ display: "flex", flexDirection: "column" }} >
                        {message?.text?.includes(".pdf") ? (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img style={{ width: 80, height: "auto", objectFit: "cover" }} src={iconPDF} alt="pdf" />
                                <Typography>{message.text.split('/').pop()}</Typography>
                            </Box>
                        ) : (
                            <img style={{ width: 200, height: "auto", objectFit: "cover" }} src={message.text} alt="pic" />
                        )}
                        <Box sx={{ display: "flex", marginLeft: "auto", gap: 1 }}>
                            <GetAppIcon sx={{ border: "1px solid grey", borderRadius: "50%" }} fontSize="small" onClick={(e) => { downloadMedia(e, message.text) }} />
                            <Time >{formatDate(message.createdAt)}</Time>
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}

