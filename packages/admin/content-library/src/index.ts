export * from './lib/content-library';
import { ContentLibrarySidebarButton } from "./lib/components/ProjectsSidebarButton";

export const contentLibrary = () => ({
    name: 'contentLibrary',
    slots: [
        {
            key: 'contentLibrarySidebarButton',
            slot: 'projectSidebarMenuItem',
            component: ContentLibrarySidebarButton
        }
    ]
});
