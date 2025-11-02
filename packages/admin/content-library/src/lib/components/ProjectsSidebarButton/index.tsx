import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { BookOpen } from "lucide-react";
import { defineMessages, useIntl } from "react-intl";

const intlMessage = defineMessages({
    contentLibrary: {
        id: 'content-library.sidebar.button',
        defaultMessage: 'Content Library'
    }
});

export const ContentLibrarySidebarButton = () => {
    const { formatMessage } = useIntl();
    return (
        <Tooltip title={
            <Typography variant="body2">{formatMessage(intlMessage.contentLibrary)}</Typography>
        } placement="right">
            <IconButton>
                <BookOpen size={22} width={22} height={22} />
            </IconButton>
        </Tooltip>
    );
};


