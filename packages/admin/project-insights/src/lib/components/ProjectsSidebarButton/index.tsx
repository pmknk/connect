import { ChartArea } from "lucide-react";
import { defineMessages } from "react-intl";
import { ProjectSideBarMenuItem } from "@content/admin-ui";

const intlMessage = defineMessages({
    insights: {
        id: 'project-insights.sidebar.button',
        defaultMessage: 'Project Insights'
    }
})

export const ProjectInsightsSidebarButton = () => (
    <ProjectSideBarMenuItem
        message={intlMessage.insights}
        icon={<ChartArea size={22} width={22} height={22} />}
    />
)

