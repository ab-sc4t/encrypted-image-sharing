import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#43f7b0',
        },
        secondary: {
            main: '#43f7b0',
        },
        background: {
            default: '#1f1e1c',
        },
        text: {
            primary: '#43f7b0',
        },
    },
    typography: {
        h3: {
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: '#43f7b0',
        },
        h6: {
            fontSize: '1.25rem',
        },
    },
});

export default theme;
