import { User } from "../../user/user.schema";

export type UserDto = {
    id: string;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
}

export const toUserResponseDto = (user: User): UserDto => ({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});