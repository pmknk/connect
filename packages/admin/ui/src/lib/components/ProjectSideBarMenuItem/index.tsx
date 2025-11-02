import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { MessageDescriptor, useIntl } from "react-intl";

export type ProjectSideBarMenuItemProps = {
    message: MessageDescriptor;
    icon: ReactNode;
    onClick?: () => void;
    placement?: "bottom" | "left" | "right" | "top";
};

export const ProjectSideBarMenuItem = ({ message, icon, onClick, placement = "right" }: ProjectSideBarMenuItemProps) => {
    const { formatMessage } = useIntl();
    return (
        <Tooltip title={<Typography variant="body2">{formatMessage(message)}</Typography>} placement={placement}>
            <IconButton onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};


