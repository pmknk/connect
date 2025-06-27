import { usePermissionAccess } from '../../hooks/usePermissionAccess';
import { PermissionState } from '../../store/slices/permission';

type PermissionAccessProps = {
    permissions: Pick<PermissionState[number], 'action' | 'resource'>[];
    operator?: 'AND' | 'OR';
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

/**
 * Component that checks if the user has the required permissions to access the content.
 *
 * @param {PermissionAccessProps} props - The component props.
 * @param {Permission[]} props.permissions - The permissions required to access the content.
 * @param {'AND' | 'OR'} [props.operator] - The operator to use when checking permissions.
 */
export const PermissionAccess = ({
    permissions,
    operator = 'AND',
    children,
    fallback = null
}: PermissionAccessProps) => {
    const hasAccess = usePermissionAccess({
        permissions,
        operator
    });

    return <>{hasAccess ? children : fallback}</>;
};
