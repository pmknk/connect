import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ChartArea } from "lucide-react";
import { defineMessages, useIntl } from "react-intl";

const intlMessage = defineMessages({
    insights: {
        id: 'project-insights.sidebar.button',
        defaultMessage: 'Project Insights'
    }
})

export const ProjectInsightsSidebarButton = () => {
    const { formatMessage } = useIntl();
    return (
        <Tooltip title={
            <Typography variant="body2">{formatMessage(intlMessage.insights)}</Typography>
        } placement="right">
            <IconButton >
                <ChartArea size={22} width={22} height={22}/>
            </IconButton>
        </Tooltip>
    )
}

