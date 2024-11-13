import { useEffect, useState, useContext } from "react";
import { getUsers } from "../../../service/api";
import { Box } from "@mui/material";
import Conversation from "./Conversation";
import { AuthContext } from "../../../context/AccountProvider";

export default function Conversations({ text }) {
    const { account } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers()
            const filteredData = res.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
            setUsers(filteredData)
        }
        fetchUsers()
    }, [text])

    return (
        <Box sx={{ overflow: 'overlay' }}>

            {users.map((user) => (
                user.sub !== account.sub &&
                <Conversation key={user._id} user={user} />
            ))}
        </Box>
    )
}
