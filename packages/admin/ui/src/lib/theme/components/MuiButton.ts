import { Components } from "@mui/material/styles";

export const MuiButton: Components['MuiButton'] = {
    styleOverrides: {
        root: {
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: '0.8rem',
            fontWeight: 500,
            '&:hover': {
                boxShadow: 'none',
            }
        },
        sizeLarge: {
            lineHeight: '1.5rem',
            fontSize: '1rem',
            padding: '0.75rem 1.5rem',
            height: '50px'
        },
        sizeMedium: {
            lineHeight: '1.5rem',
            fontSize: '1rem',
            padding: '0.625rem 1.25rem',
            height: '46px'
        },
        sizeSmall: {
            lineHeight: '1.25rem',
            fontSize: '0.875rem',
            padding: '0.5rem 1rem',
            height: '38px'
        },
    }
} as const;