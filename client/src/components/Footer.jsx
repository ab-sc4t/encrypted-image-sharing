import React from "react";
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();
    return(
        <Box sx={{textAlign: "center", backgroundColor: theme.palette.background.default, height: "4vh"}}>
            <Typography variant="h7" sx={{color: theme.palette.text.primary}}>By Ayush Bansal</Typography>
        </Box>
    )
}

export default Footer;