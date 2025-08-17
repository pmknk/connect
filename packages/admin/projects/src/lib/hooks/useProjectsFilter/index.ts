import { useSearchParams } from 'react-router-dom';
import type { ProjectsActivityFilterValue } from '../../components/ProjectsActivityFilter';

type UseProjectsFilterReturn = {
    activityFilter: ProjectsActivityFilterValue;
    setActivityFilter: (value: ProjectsActivityFilterValue) => void;
    search: string;
    setSearch: (value: string) => void;
};

export const useProjectsFilter = (): UseProjectsFilterReturn => {
    const [searchParams, setSearchParams] = useSearchParams();

    const activityParam = searchParams.get('activity');
    const activityFilter: ProjectsActivityFilterValue =
        activityParam === 'active' || activityParam === 'inactive'
            ? activityParam
            : 'all';

    const search = searchParams.get('search') || '';

    const updateSearchParam = (key: string, value: string | null) => {
        const next = new URLSearchParams(searchParams);
        if (value && value.length > 0) {
            next.set(key, value);
        } else {
            next.delete(key);
        }
        setSearchParams(next, { replace: true });
    };

    const setActivityFilter = (value: ProjectsActivityFilterValue) => {
        updateSearchParam('activity', value === 'all' ? null : value);
    };

    const setSearch = (value: string) => {
        updateSearchParam('search', value);
    };

    return {
        activityFilter,
        setActivityFilter,
        search,
        setSearch
    };
};
