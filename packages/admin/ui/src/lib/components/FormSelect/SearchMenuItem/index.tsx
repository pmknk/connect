import { ListSubheader, ListSubheaderProps, TextField, TextFieldProps } from "@mui/material";

type SearchMenuItemProps = {
    listSubheaderProps?: ListSubheaderProps;
    textFieldProps?: TextFieldProps;
}

export const SearchMenuItem = ({ listSubheaderProps, textFieldProps }: SearchMenuItemProps) => {
    return (
        <ListSubheader component="div" sx={{
            px: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            mb:1,
            position: 'sticky',
            top: 8,
            zIndex: 1,
            bgcolor: 'background.paper'
        }} {...listSubheaderProps}>
            <TextField
                type="text"
                size="small"
                fullWidth
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '0.4rem'
                    }
                }}
                onKeyDown={(e) => {
                    e.stopPropagation();
                }}
                onKeyUp={(e) => {
                    e.stopPropagation();
                }}
                onKeyPress={(e) => {
                    e.stopPropagation();
                }}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => e.stopPropagation()}
                {...textFieldProps}
            />
        </ListSubheader>
    )
};