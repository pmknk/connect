import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { breakpoints } from './breakpoints';

import { MuiButton } from './components/MuiButton';
import { MuiLink } from './components/MuiLink';
import { MuiTextField } from './components/MuiTextField';
import { MuiAlert } from './components/MuiAlert';
import { MuiOutlinedInput } from './components/MuiOutlinedInput';
import { MuiInputLabel } from './components/MuiInputLabel';
import { MuiInputBase } from './components/MuiInputBase';
import { MuiIconButton } from './components/MuiIconButton';
import { MuiCheckbox } from './components/MuiCheckbox';
import { MuiChip } from './components/MuiChip';

export const theme = createTheme({
    breakpoints: breakpoints,
    shape: {
        borderRadius: '0.6rem',
    },
    palette: {
        ...colors,
        action: {
            disabledBackground: colors.gray[200],
            disabled: colors.gray[400],
            hover: colors.gray[100],
            active: colors.gray[300],
            focus: colors.gray[200],
            selected: colors.gray[200],
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
    components: {
        MuiButton,
        MuiLink,
        MuiTextField,
        MuiAlert,
        MuiOutlinedInput,
        MuiInputLabel,
        MuiInputBase,
        MuiIconButton,
        MuiCheckbox,
        MuiChip,
    }
});
