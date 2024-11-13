import { Box, InputBase } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material'

export default function Search({ setText }) {

    return (
        <Box sx={{ display: "flex", p: "1rem", alignItems: "center", height: "1rem" }}>
            <Box sx={{ backgroundColor: "#f0f2f5", width: "100%", borderRadius: "0.5rem" }}>
                <InputBase placeholder="Search or Start New Chat" startAdornment={<SearchIcon sx={{ m: "0.5rem 1rem" }} />} sx={{ width: "100%" }}
                onChange={(e)=>{setText(e.target.value)}}
                />
            </Box>
        </Box>
    )
}
