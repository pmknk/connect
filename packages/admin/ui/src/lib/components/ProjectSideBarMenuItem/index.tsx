import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { MessageDescriptor, useIntl } from "react-intl";

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
    return (
        <Tooltip title={<Typography variant="body2">{formatMessage(message)}</Typography>} placement={placement}>
            <IconButton {...iconButtonProps}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};


