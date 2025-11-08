import { ChartArea } from 'lucide-react';
import { defineMessages } from 'react-intl';
import { ProjectSideBarMenuItem } from '@content/admin-ui';
import { Link } from 'react-router-dom';
import { PROJECT_INSIGHTS_ROUTES } from '../../constants';

const intlMessage = defineMessages({
    insights: {
        id: 'project-insights.sidebar.button',
        defaultMessage: 'Insights'
    }
});

export const ProjectInsightsSidebarButton = () => (
    <ProjectSideBarMenuItem
        message={intlMessage.insights}
        icon={<ChartArea size={22} width={22} height={22} />}
        iconButtonProps={{
            component: Link,
            to: PROJECT_INSIGHTS_ROUTES.INSIGHTS
        }}
    />
);
