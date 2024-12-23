import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, InputAdornment, InputLabel, FormControl, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { saveAs } from 'file-saver';
import Lottie from "lottie-react";
import loadingAnimation from "../loadingAnimation.json";

const HomePage = () => {
    const theme = useTheme();
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image && password) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image', image);
            formData.append('password', password);

            try {
                const response = await fetch("https://encrypted-image-sharing.onrender.com/encrypt-image", {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const blob = await response.blob();
                    saveAs(blob, 'encrypted-image.jpeg');
                } else {
                    console.error('Failed to encrypt and download the image.');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false); 
            }
        } else {
            alert('Please provide both an image and a password.');
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ height: "16vh", backgroundColor: theme.palette.background.default }}></Box>
                <Box sx={{ backgroundColor: theme.palette.background.default, height: "74vh" }}>
                    <Box sx={{
                        paddingTop: "2rem",
                        textAlign: "center",
                        backgroundColor: theme.palette.background.dark,
                        color: theme.palette.primary.main
                    }}>
                        <Typography variant="h3" color="inherit">Encrypt Image</Typography>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "2rem"
                    }}>
                        <Box sx={{ padding: "2rem", width: { xs: "80%", sm: "auto" } }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file"
                                onChange={handleImageChange}
                                sx={{
                                    marginBottom: "16px",
                                    backgroundColor: theme.palette.background.default,
                                    color: theme.palette.primary.main,
                                    '& .MuiInputBase-root': {
                                        color: theme.palette.primary.main,
                                        backgroundColor: theme.palette.background.default
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: theme.palette.primary.main,
                                        backgroundColor: theme.palette.background.default
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ padding: "2rem", width: { xs: "80%", sm: "auto" } }}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-password" sx={{ color: theme.palette.primary.main }}>Enter desired password</InputLabel>
                                <OutlinedInput
                                    id="outlined-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    onChange={handlePassword}
                                    value={password}
                                    sx={{
                                        marginBottom: "16px",
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.primary.main,
                                        '& .MuiInputBase-root': {
                                            color: theme.palette.primary.main,
                                            backgroundColor: theme.palette.background.paper
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: "center", padding: "1rem" }}>
                        {isLoading ? (
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop
                                    style={{ width: 200 , height: 200 }}
                                />
                            </Box>
                        ) : (
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.background.default,
                                    padding: "12px 24px",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                    }
                                }}
                            >
                                Encrypt and Download
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HomePage;
