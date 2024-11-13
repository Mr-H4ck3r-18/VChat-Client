import { useContext, useState } from 'react';
import { Box } from '@mui/material';

//components
import { AuthContext } from '../../../context/AccountProvider';
import Header from './components/Header';
import Search from './components/Search';
import Conversations from './Conversations';

export default function Menu() {
    const { account } = useContext(AuthContext)
    const [text, setText] = useState('')
    return (
        <Box>
            {/* Header */}
            <Header image={account.picture} />

            {/* Search */}
            <Search setText={setText} />

            {/* Chats */}
            <Conversations text={text} />
        </Box>
    )
}
