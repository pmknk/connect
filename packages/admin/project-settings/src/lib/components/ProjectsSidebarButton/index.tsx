import { Settings } from "lucide-react";
import { defineMessages } from "react-intl";
import { ProjectSideBarMenuItem } from "@content/admin-ui";

const intlMessage = defineMessages({
    settings: {
        id: 'project-settings.sidebar.button',
        defaultMessage: 'Project Settings'
    }
});

export const ProjectSettingsSidebarButton = () => (
    <ProjectSideBarMenuItem
        message={intlMessage.settings}
        icon={<Settings size={22} width={22} height={22} />}
    />
);


