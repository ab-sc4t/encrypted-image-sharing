import React from "react"
import { Box, Button } from '@mui/material'

const Header = () => {

    const handleEncrypt = () =>{
        window.location.href = "/";
    }

    const handleDecrypt = () =>{
        window.location.href = "/decrypt";
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Box>
                <Button onClick={handleEncrypt}>
                    Encrypt
                </Button>
            </Box>
            <Box>
                <Button onClick={handleDecrypt}>
                    Decrypt
                </Button>
            </Box>
        </Box>
    )
}

export default Header;