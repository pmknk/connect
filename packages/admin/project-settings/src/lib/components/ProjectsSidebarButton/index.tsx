import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Settings } from "lucide-react";
import { defineMessages, useIntl } from "react-intl";

const intlMessage = defineMessages({
    settings: {
        id: 'project-settings.sidebar.button',
        defaultMessage: 'Project Settings'
    }
});

export const ProjectSettingsSidebarButton = () => {
    const { formatMessage } = useIntl();
    return (
        <Tooltip title={
            <Typography variant="body2">{formatMessage(intlMessage.settings)}</Typography>
        } placement="right">
            <IconButton>
                <Settings size={22} width={22} height={22} />
            </IconButton>
        </Tooltip>
    );
};


