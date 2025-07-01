import { colors } from '../colors';

export const MuiOutlinedInput = {
    styleOverrides: {
        root: {
            '& fieldset': {
                borderColor: colors.gray[300],
            }
        },
        input: {
            padding: '0.75rem',
            lineHeight: '100px'
        }
    },
}; 