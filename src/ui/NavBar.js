import { AppBar, Toolbar, styled, Box } from '@mui/material'



const Component = styled(Box)`
    height:100vh;
    background: #dcdcdc;
`

export default function NavBar(height) {
    return (
        <Component>
            <AppBar sx={{ height: height, backgroundColor: "#5a990f", boxShadow: 'none' }} >
                <Toolbar>
                </Toolbar>
            </AppBar>
        </Component>
    )
}
