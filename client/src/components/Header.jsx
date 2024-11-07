import React from "react"
import { Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const Header = () => {
    const theme = useTheme();
    const handleEncrypt = () =>{
        window.location.href = "/";
    }

    const handleDecrypt = () =>{
        window.location.href = "/decrypt";
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center",height: "6vh", backgroundColor: theme.palette.background.default }}>
            <Box>
                <Button onClick={handleEncrypt} sx={{width: "50vw"}}>
                    Encrypt
                </Button>
            </Box>
            <Box>
                <Button onClick={handleDecrypt} sx={{width: "50vw"}}>
                    Decrypt
                </Button>
            </Box>
        </Box>
    )
}

export default Header;