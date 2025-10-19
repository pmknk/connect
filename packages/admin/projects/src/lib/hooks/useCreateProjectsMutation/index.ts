import { useHttpClient, useUser } from '@connect/admin-utils';
import { useMutation } from '@tanstack/react-query';
import { CreateProjectFormData } from '../useCreateProjectForm';

const CREATE_PROJECTS_ROUTE = '/api/v1/identity/projects';

export const useCreateProjectsMutation = () => {
    const httpClient = useHttpClient();
    const { user } = useUser();

    return useMutation({
        mutationFn: (data: CreateProjectFormData) =>
            httpClient.post(CREATE_PROJECTS_ROUTE, {
                ...data,
                userIds: [user?.id, ...data.userIds]
            })
    });
};
