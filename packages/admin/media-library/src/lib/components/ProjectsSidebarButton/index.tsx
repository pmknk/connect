import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Image } from "lucide-react";
import { defineMessages, useIntl } from "react-intl";

const intlMessage = defineMessages({
    mediaLibrary: {
        id: 'media-library.sidebar.button',
        defaultMessage: 'Media Library'
    }
});

export const MediaLibrarySidebarButton = () => {
    const { formatMessage } = useIntl();
    return (
        <Tooltip title={
            <Typography variant="body2">{formatMessage(intlMessage.mediaLibrary)}</Typography>
        } placement="right">
            <IconButton>
                <Image size={22} width={22} height={22} />
            </IconButton>
        </Tooltip>
    );
};


