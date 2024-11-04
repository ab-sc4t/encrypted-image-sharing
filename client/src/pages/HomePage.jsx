import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, InputAdornment, InputLabel, FormControl, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const HomePage = () => {
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

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
            const formData = new FormData();
            formData.append('image', image);
            formData.append('password', password);

            try {
                const response = await fetch('http://localhost:8080/encrypt-image', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'encrypted-image.jpeg';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                } else {
                    console.error('Failed to encrypt and download the image.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Please provide both an image and a password.');
        }
    };

    return (
        <>
            <Box sx={{ paddingTop: "2rem", textAlign: "center"}}>
                <Typography variant="h3">Encrypt Image</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Box sx={{ padding: "2rem" }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="file"
                        onChange={handleImageChange}
                    />
                </Box>
                <Box sx={{ padding: "2rem" }}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-password">Enter desired password</InputLabel>
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
                        />
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{textAlign: "center"}}>
                <Button type="submit" onClick={handleSubmit}>Encrypt and Download</Button>
            </Box>
        </>
    );
};

export default HomePage;
