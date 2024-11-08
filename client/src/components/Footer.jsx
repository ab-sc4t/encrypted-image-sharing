import React from "react";
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();
    return(
        <Box sx={{textAlign: "center", backgroundColor: theme.palette.background.default, height: "4vh"}}>
            <Typography variant="h7" sx={{color: "white"}}>By <Link href="https://github.com/ab-sc4t" sx={{color: theme.palette.text.primary}}>Ayush Bansal</Link></Typography>
        </Box>
    )
}

export default Footer;