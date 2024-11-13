import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

import { getConversation } from '../../../service/api'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AccountProvider";

export default function ChatBox() {
    const { person, account } = useContext(AuthContext)
    const [conversationId, setConversationId] = useState('')
    useEffect(() => {
        const getConversationDetails = async () => {
            const res = await getConversation({ senderId: account.sub, receiverId: person.sub })
            setConversationId(res)
        }
        getConversationDetails()
    }, [person.sub, account.sub])
    return (
        <>
            {/* Header */}
            <ChatHeader person={person} />
            {/* Chats */}
            <Messages person={person} conversationId={conversationId} />
            {/* Type here */}

        </>
    )
}
