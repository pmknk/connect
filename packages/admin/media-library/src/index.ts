export * from './lib/media-library';
import { MediaLibrarySidebarButton } from "./lib/components/ProjectsSidebarButton";

export const mediaLibrary = () => ({
    name: 'mediaLibrary',
    slots: [
        {
            key: 'mediaLibrarySidebarButton',
            slot: 'projectSidebarMenuItem',
            component: MediaLibrarySidebarButton
        }
    ]
});
