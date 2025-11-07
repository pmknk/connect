import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { ExtendedTheme } from "../../types";
import { useTheme } from "@mui/material";
import { useMatch, useResolvedPath } from "react-router-dom";

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
    const to = iconButtonProps?.to;
    const resolved = useResolvedPath(to ?? "");
    const match = to ? useMatch({ path: resolved.pathname, end: false }) : null;
    const isActive = Boolean(match);
    return (
        <Tooltip title={<Typography variant="body2">{formatMessage(message)}</Typography>} placement={placement}>
            <IconButton 
                sx={[
                    {
                        ...(isActive ? { backgroundColor: palette.gray[100] } : {}),
                        '&:hover': {
                            backgroundColor: palette.gray[100],
                        },
                    },
                    iconButtonProps?.sx as any
                ]}
                {...iconButtonProps}
            >
                {icon}
            </IconButton>
        </Tooltip>
    );
};


