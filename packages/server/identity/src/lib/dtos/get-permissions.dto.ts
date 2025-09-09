import { type Permission } from '../schemas/permission.schema';

export type GetPermissionsResponseDto = {
    data: {
        id: string;
        action: string;
        resource: string;
    }[];
};

export const toGetPermissionsResponseDto = (
    permissions: Omit<Permission, 'roles'>[]
): GetPermissionsResponseDto => {
    return {
        data: permissions.map((permission) => ({
            id: permission.id,
            action: permission.action,
            resource: permission.resource
        }))
    };
};
