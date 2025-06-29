import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { breakpoints } from './breakpoints';
import { MuiButton } from './components/MuiButton';

export const theme = createTheme({
    breakpoints: breakpoints,
    palette: {
        ...colors,
        action: {
            disabledBackground: colors.gray[200],
            disabled: colors.gray[400],
            hover: colors.gray[200],
            active: colors.gray[300],
            focus: colors.gray[200],
            selected: colors.gray[200],
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
    components: {
        MuiButton: MuiButton,
        MuiLink: {
            styleOverrides: {
                root: {
                    color: colors.orange[500],
                    textDecoration: 'none',
                },
            },
        },
    }
});
