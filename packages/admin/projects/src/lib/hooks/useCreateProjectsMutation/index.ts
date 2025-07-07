import { useHttpClient } from '@avyyx/admin-utils';
import { useMutation } from '@tanstack/react-query';
import { CreateProjectFormData } from '../useCreateProjectForm';

const CREATE_PROJECTS_ROUTE = '/identity/projects';

export const useCreateProjectsMutation = () => {
    const httpClient = useHttpClient();

    return useMutation({
        mutationFn: (data: CreateProjectFormData) =>
            httpClient.post(CREATE_PROJECTS_ROUTE, data)
    });
};
