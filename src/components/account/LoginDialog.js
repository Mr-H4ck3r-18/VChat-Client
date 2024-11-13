import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

import { Box, Dialog, Typography, List, ListItem, Button, styled, FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import { AccountCircle, KeyOutlined } from '@mui/icons-material';
import { useState, useContext, useEffect } from "react";

import { AuthContext } from '../../context/AccountProvider';
import { addUser } from '../../service/api';



const dialogStyle = {
    height: '96%',
    marginTop: "12%",
    width: "70%",
    maxWidth: '100%',
    maxHeight: "100%",
    boxShadow: "none",
    overFlow: "hidden"
}

const ButtonSubmit = styled(Button)`
    background-color:#5a990f;
    color: #ffffff;
`

const Title = styled(Typography)`
    font-size:2.2rem;
    margin-bottom:1rem;
    color: #525252;
    font-weight:350;
    font-family:inherit
`

const StyledList = styled(List)`
    & > li {
    padding:0;
    margin-top:1rem;
    
    }
`

export default function LoginDialog() {

    const { setAccount } = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError('Both fields are required');
            return;
        }
        setError('');
        console.log('Username:', username);
        console.log('Password:', password);

        setAccount({ userName: username, password: password })
        // Perform any further actions like sending API requests
    };

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const onLoginSuccess = async (res) => {
        const decode = jwtDecode(res.credential)
        setAccount(decode)
        localStorage.setItem('user', JSON.stringify(decode))
        await addUser(decode)
    }
    const onLoginError = (res) => {
        console.log("Login failed", res)
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setAccount(JSON.parse(storedUser))
        }
    }, [setAccount])

    return (
        <Dialog open={true} PaperProps={{ sx: dialogStyle }}>
            <Box sx={{ p: "5rem", display: "flex", justifyContent: "space-between" }}>
                {/* Left */}
                <Box >
                    <Title>Log into VChat</Title>
                    <StyledList>
                        <ListItem>1. Login using user name and password</ListItem>
                        <ListItem>2. Search for users</ListItem>
                        <ListItem>3. Start texting</ListItem>
                    </StyledList>
                </Box>
                {/* right */}
                <Box sx={{ p: '0 3rem' }}>
                    <form onSubmit={handleSubmit} >
                        {/* Username input with FormControl */}
                        <FormControl fullWidth margin="normal" error={!!error}>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                startAdornment={<AccountCircle sx={{ color: 'action.active', my: 0.5 }} />}
                            />
                            <FormHelperText>{error && error}</FormHelperText>
                        </FormControl>

                        {/* Password input with FormControl */}
                        <FormControl fullWidth margin="normal" error={!!error}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                startAdornment={<KeyOutlined sx={{ color: 'action.active', my: 0.5 }} />}
                            />
                            <FormHelperText>{error && error}</FormHelperText>
                        </FormControl>
                        <Box sx={{ display: "flex", alignItems: 'center', mt: "2rem", gap: 10 }}>
                            <ButtonSubmit type="submit">
                                Login
                            </ButtonSubmit>
                            <span>or</span>
                            <GoogleLogin
                                shape='pill'
                                size='large'
                                onSuccess={onLoginSuccess}
                                onError={onLoginError}
                            />
                        </Box>
                    </form>

                </Box>
            </Box>
        </Dialog>
    )
}
