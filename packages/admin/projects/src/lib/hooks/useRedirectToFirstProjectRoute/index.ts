import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PROJECTS_ROUTES } from '../../constants';
import type { SlotComponent } from '@content/admin-utils';

/**
 * Redirects from /projects/:projectId to the first provided project route slot.
 */
export function useRedirectToFirstProjectRoute(options: {
    projectId?: string;
    projectRoutes: SlotComponent[];
}) {
    const { projectId, projectRoutes } = options;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!projectId) return;
        const basePath = `${PROJECTS_ROUTES.PROJECTS}/${projectId}`;
        const currentPath = location.pathname.replace(/\/+$/, '');

        if (currentPath === basePath && projectRoutes.length > 0) {
            const firstRoute = projectRoutes[0];
            const firstRoutePath: string | undefined = (firstRoute?.component as any)?.props?.path;
            if (!firstRoutePath) return;

            const sanitized = firstRoutePath
                .replace(/\/\*$/, '') // remove /* suffix
                .replace(/^\//, '');   // remove leading /

            navigate(`${basePath}/${sanitized}`, { replace: true });
        }
    }, [location.pathname, projectId, projectRoutes, navigate]);
}


