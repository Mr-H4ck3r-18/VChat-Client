
//components
import { useContext } from "react"
import NavBar from "../ui/NavBar"
import LoginDialog from "./account/LoginDialog"
import { AuthContext } from "../context/AccountProvider"
import ChatDialog from "./chat/ChatDialog"

export default function Messenger() {
    const { account } = useContext(AuthContext)

    return (
        <>
            {account ? (
                <>
                    <NavBar height='8rem' />
                    <ChatDialog />
                </>
            ) : (
                <>
                    <NavBar height='12rem' />
                    <div>
                        <LoginDialog />
                    </div>
                </>
            )}
        </>
    )
}
