import { Box, InputBase, styled } from "@mui/material";

import { useEffect } from "react";

import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { uploadFile } from '../../../service/api'

const Container = styled(Box)`
    height:50px;
    display:flex;
    padding: 0.5rem 1rem;
    background:#ededed;
    width:100%;
    align-items: center;
    & > * {
    margin:5px;
    color:#919191;
    }
`

const MessageField = styled(Box)`
    background-color: #FFFFFF;
    width: calc(94% - 100px);
    border-radius: 0.5rem ; 
`

const InputField = styled(InputBase)`
    padding:20px;
    height:20px;
`

export default function Footer({ sendMessage, setText, text, file, setFile, setImage }) {
    const fileChange = (e) => {
        setFile(e.target.files[0])
        setText(e.target.files[0].name)
    }

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                setImage(response.data)
            }
        }
        getImage()
    }, [file, setImage])

    return (
        <Container>
            <SentimentSatisfiedAltOutlinedIcon />
            <label htmlFor="fileInput">
                <AttachFileOutlinedIcon />
            </label>
            <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => fileChange(e)} />
            <MessageField>
                <InputField
                    placeholder="Type your message here"
                    fullWidth
                    onChange={(e) => { setText(e.target.value) }}
                    onKeyPress={(e) => { sendMessage(e) }}
                    value={text}
                />
            </MessageField>
            <SendOutlinedIcon />
        </Container>
    )
}
