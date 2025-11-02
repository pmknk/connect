import { Image } from "lucide-react";
import { defineMessages } from "react-intl";
import { ProjectSideBarMenuItem } from "@content/admin-ui";

const intlMessage = defineMessages({
    mediaLibrary: {
        id: 'media-library.sidebar.button',
        defaultMessage: 'Media Library'
    }
});

export const MediaLibrarySidebarButton = () => (
    <ProjectSideBarMenuItem
        message={intlMessage.mediaLibrary}
        icon={<Image size={22} width={22} height={22} />}
    />
);


