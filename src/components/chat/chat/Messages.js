import { Box, styled } from "@mui/material";

import Footer from "./Footer";
import { useContext, useState, useEffect, useRef } from "react";

import { AuthContext } from '../../../context/AccountProvider'
import { newMessage, getMessages } from "../../../service/api";
import Message from "./Message";


const MsgsContainer = styled(Box)`
    background-image:url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size:50%;
`

const Container = styled(Box)`
    height:80vh;
    overflow-y:scroll;
    margin-bottom:0.5rem
`
const Wrapper = styled(Box)`
    padding: 1px 50px
`

export default function Messages({ person, conversationId }) {
    const [file, setFile] = useState()
    const { account, socket, newMsg, setNewMsg } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [messages, setMessages] = useState();
    const [image, setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);
    const Scroll = useRef();

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, [socket])

    useEffect(() => {
        Scroll.current?.scrollIntoView({ transition: "smooth" })
    }, [messages])

    useEffect(() => {
        const getMsgs = async () => {
            let msgs = await getMessages(conversationId._id)
            setMessages(msgs)
        }
        conversationId && getMsgs();
    }, [person._id, conversationId, newMsg])

    const sendMessage = async (e) => {
        const code = e.keycode || e.which
        let message = {}
        if (code === 13) {
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversationId._id,
                    type: "text",
                    text: text,
                }
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversationId._id,
                    type: "file",
                    text: image,
                }
            }
            socket.current.emit('sendMessage', message)
            await newMessage(message)
            setNewMsg(prev => !prev)
            setText('')
            setFile('')
            setImage('')
        }
    }

    useEffect(() => {
        incomingMessage && conversationId?.members?.includes(incomingMessage.senderId) && setMessages(prev => [...prev, incomingMessage]);
        setNewMsg(true)
    }, [conversationId, incomingMessage])


    return (
        <MsgsContainer>
            <Container >
                {
                    messages && messages.map(message => (
                        <Wrapper key={message.updatedAt} ref={Scroll}>
                            <Message message={message} sender={account.sub} />
                        </Wrapper>

                    ))
                }
            </Container>
            <Footer sendMessage={sendMessage} setText={setText} text={text} file={file} setFile={setFile} setImage={setImage} />
        </MsgsContainer>
    )
}
