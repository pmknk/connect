import { usePermissions } from '../usePermissions';

type PermissionAccessProps = {
    /**
     * Array of permission objects containing action and resource
     */
    permissions: {
        /** The permission action to check */
        action: string;
        /** The permission resource to check */
        resource: string;
    }[];
    /**
     * Operator to use when checking multiple permissions
     * - 'AND': All permissions must match
     * - 'OR': At least one permission must match
     * @default 'AND'
     */
    operator?: 'AND' | 'OR';
};

/**
 * Hook that checks if the user has the required permissions
 *
 * @param props - The permission check configuration
 * @param props.operator - Operator to use when checking multiple permissions ('AND'|'OR')
 * @param props.permissions - Array of permissions to check against
 * @returns boolean indicating if user has required permissions
 */
export const usePermissionAccess = ({
    operator = 'AND',
    permissions
}: PermissionAccessProps) => {
    const { permission: existingPermissions } = usePermissions();
    return permissions[operator === 'AND' ? 'every' : 'some']((permission) =>
        existingPermissions.some(
            (p) =>
                p.action === permission.action &&
                p.resource === permission.resource
        )
    );
};
