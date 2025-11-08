import { Components } from '@mui/material/styles';
import { colors } from '../colors';

export const MuiLink: Components['MuiLink'] = {
    styleOverrides: {
        root: {
            color: colors.orange[500],
            textDecoration: 'none'
        }
    }
};
