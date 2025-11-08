import { BookOpen } from 'lucide-react';
import { defineMessages } from 'react-intl';
import { ProjectSideBarMenuItem } from '@content/admin-ui';
import { Link } from 'react-router-dom';
import { CONTENT_LIBRARY_ROUTES } from '../../constants';

const intlMessage = defineMessages({
    contentLibrary: {
        id: 'content-library.sidebar.button',
        defaultMessage: 'Content Library'
    }
});

export const ContentLibrarySidebarButton = () => (
    <ProjectSideBarMenuItem
        message={intlMessage.contentLibrary}
        icon={<BookOpen size={22} width={22} height={22} />}
        iconButtonProps={{
            component: Link,
            to: CONTENT_LIBRARY_ROUTES.CONTENT
        }}
    />
);
