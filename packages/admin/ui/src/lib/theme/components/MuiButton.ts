import { Components } from "@mui/material/styles";

export const MuiButton: Components['MuiButton'] = {
    styleOverrides: {
        root: {
            textTransform: 'none',
            boxShadow: 'none',
            fontWeight: 500,
            '&:hover': {
                boxShadow: 'none',
            }
        },
        sizeLarge: {
            lineHeight: '1.5rem',
            fontSize: '1rem',
            padding: '0.625rem 1.25rem',
            height: '46px'
        },
        sizeMedium: {
            lineHeight: '1.25rem',
            fontSize: '0.875rem',
            padding: '0.5rem 1rem',
            height: '38px'
        },
        sizeSmall: {
            lineHeight: '1.25rem',
            fontSize: '0.875rem',
            padding: '0.375rem 0.75rem',
            height: '34px'
        },
    }
} as const;