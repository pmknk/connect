import { Components } from "@mui/material/styles";

export const MuiTextField: Components['MuiTextField'] = {
    styleOverrides: {
        root: {
            '& .MuiFormHelperText-root': {
                marginLeft: '0.25rem',
            }
        },
    },
};