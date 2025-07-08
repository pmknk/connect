import { useHttpClient } from '@avyyx/admin-utils';
import { useQuery } from '@tanstack/react-query';

/**
 * Response type for the projects query
 * @property {Object[]} data - Array of project objects
 * @property {string} data[].id - Unique identifier for the project
 * @property {string} data[].name - Name of the project
 * @property {string} data[].slug - URL-friendly identifier for the project
 * @property {string} data[].description - Description of the project
 */
export type ProjectsQueryResponse = {
    data: {
        id: string;
        name: string;
        slug: string;
        description: string;
    }[];
};

const GET_ALL_PROJECTS_ROUTE = '/api/v1/identity/projects';

/**
 * Custom hook for fetching and managing projects data
 *
 * Fetches all projects from the API using React Query for caching and state management.
 *
 * @returns An object containing:
 *   - data: Array of project objects with id, name, slug, and description
 *   - isLoading: Boolean indicating if the query is in progress
 *   - error: Any error that occurred during the query
 *   - refetch: Function to manually refetch the data
 *
 * @example
 * ```tsx
 * const { data: projects, isLoading, error } = useProjectsQuery()
 *
 * if (isLoading) return <div>Loading projects...</div>
 * if (error) return <div>Error loading projects</div>
 *
 * return (
 *   <div>
 *     {projects?.map(project => (
 *       <div key={project.id}>{project.name}</div>
 *     ))}
 *   </div>
 * )
 * ```
 */
export const useProjectsQuery = () => {
    const httpClient = useHttpClient();

    return useQuery({
        queryKey: ['projects'],
        queryFn: ({ signal }) =>
            httpClient.get<ProjectsQueryResponse>(GET_ALL_PROJECTS_ROUTE, {
                signal
            }),
        select: ({ data }) => data.data
    });
};
