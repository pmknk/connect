import { colors } from '../colors';

export const MuiOutlinedInput = {
    styleOverrides: {
        root: {
            borderRadius: '0.8rem',
            '& fieldset': {
                borderColor: colors.gray[300],
            }
        },
        input: {
            padding: '0.75rem',
        }
    },
}; 