export * from './lib/project-settings';
import { ProjectSettingsSidebarButton } from "./lib/components/ProjectsSidebarButton";

export const projectSettings = () => ({
    name: 'projectSettings',
    slots: [
        {
            key: 'projectSettingsSidebarButton',
            slot: 'projectSidebarMenuItem',
            component: ProjectSettingsSidebarButton
        }
    ]
});
