import { Role } from "../role.schema";

export type RolesResponseDto = {
    data: {
        id: string;
        slug: string;
        name: string;
        description: string;
    }[];
};

export const toRolesResponseDto = (roles: Role[]): RolesResponseDto => {
    return {
        data: roles.map(role => ({
            id: role.id,
            slug: role.slug,
            name: role.name,
            description: role.description,
        })),
    };
};