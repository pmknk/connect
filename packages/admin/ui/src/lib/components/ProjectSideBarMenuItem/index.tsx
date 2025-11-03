import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { ExtendedTheme } from "../../types";
import { useTheme } from "@mui/material";

export type ProjectSideBarMenuItemProps = {
    message: MessageDescriptor;
    icon: ReactNode;
    placement?: "bottom" | "left" | "right" | "top";
    iconButtonProps?: IconButtonProps & {
        to?: string;
    };
};

export const ProjectSideBarMenuItem = ({ message, icon, iconButtonProps, placement = "right" }: ProjectSideBarMenuItemProps) => {
    const { formatMessage } = useIntl();
    const { palette } = useTheme<ExtendedTheme>();
    return (
        <Tooltip title={<Typography variant="body2">{formatMessage(message)}</Typography>} placement={placement}>
            <IconButton 
            sx={{
                '&:hover': {
                    backgroundColor: palette.slate[100],
                },
            }}
            {...iconButtonProps}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};


