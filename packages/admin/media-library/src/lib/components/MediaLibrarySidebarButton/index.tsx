import { Image } from 'lucide-react';
import { defineMessages } from 'react-intl';
import { ProjectSideBarMenuItem } from '@content/admin-ui';
import { Link } from 'react-router-dom';
import { MEDIA_LIBRARY_ROUTES } from '../../constants';

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
        iconButtonProps={{
            component: Link,
            to: MEDIA_LIBRARY_ROUTES.MEDIA
        }}
    />
);
