import { Permission } from "../permission.schema";

export type PermissionResponseDto = {
    data: {
        id: string;
        action: string;
        resource: string;
    }[];
};

export const toPermissionResponseDto = (permissions: Omit<Permission, 'roles'>[]): PermissionResponseDto => {
    return {
        data: permissions.map(permission => ({
            id: permission.id,
            action: permission.action,
            resource: permission.resource,
        })),
    };
};