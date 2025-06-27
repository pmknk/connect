import { FolderX } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { PermissionAccess } from '@avyyx/admin-utils';
import { CreateProject } from '../CreateProject';

export const NoProjectsFoundCta = () => {
    return (
        <div className="h-full pb-32">
            <div className="flex flex-col items-center justify-center h-full gap-2 text-center [text-wrap:balance]">
                <FolderX size={60} className="text-gray-400" strokeWidth={1} />
                <h1 className="text-2xl">
                    <FormattedMessage
                        id="projects.empty"
                        defaultMessage="No projects found"
                    />
                </h1>
                <p className="text-gray-500">
                    <FormattedMessage
                        id="projects.empty.description"
                        defaultMessage="You don't have any projects you are working on"
                    />
                </p>
                <PermissionAccess
                    permissions={[
                        { action: 'create', resource: 'admin:project' }
                    ]}
                >
                    <div className="mt-2">
                        <CreateProject />
                    </div>
                </PermissionAccess>
            </div>
        </div>
    );
};
