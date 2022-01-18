// MATERIAL UI
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        useNextVariants: true,
        subtitle1: {
            borderWidth: 'thin',
            lineHeight: '1.0',
            fontWeight: '500',
            paddingTop: '5px',
            paddingBottom: '5px',
        },
        subtitle2: {
            borderWidth: 'thin',
            lineHeight: '1.0',
            fontWeight: '500',
            paddingTop: '5px',
        },
        overline: {
            fontWeight: '500',
            lineHeight: '2.0',
        },
    },
    palette: {
        primary: {
            main: '#1d1f21',
            dark: '#000',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ff007f',
            contrastText: '#fff',
        },
        info: {
            main: '#2196f3',
            dark: '#1976d2',
        },
        error: {
            main: '#f44336',
            dark: '#d32f2f',
        },
    },
});

export default theme;
