import { Role } from '../schemas/role.schema';

export type GetRolesResponseDto = {
    data: {
        id: string;
        slug: string;
        name: string;
        description: string;
    }[];
};

export const toGetRolesResponseDto = (roles: Role[]): GetRolesResponseDto => {
    return {
        data: roles.map((role) => ({
            id: role.id,
            slug: role.slug,
            name: role.name,
            description: role.description
        }))
    };
};
