import { User } from '../schemas/user.schema';

export type UserResponseDto = {
    data: {
        id: string;
        email: string;
        fullName: string;
        createdAt?: Date;
        updatedAt?: Date;
    };
};

export const toUserResponseDto = (user: User): UserResponseDto => ({
    data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
});
