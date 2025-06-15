import { TokensPair } from "../services/jwt.service";

export type SigninDto = {
    email: string;
    password: string;
};

export type SigninResponseDto = {
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
    refreshTokenExpiresIn: number;
};

export const toSigninResponseDto = (tokensPair: TokensPair): SigninResponseDto => {
    return {
        accessToken: tokensPair.accessToken,
        accessTokenExpiresIn: tokensPair.accessTokenExpiresIn,
        refreshToken: tokensPair.refreshToken,
        refreshTokenExpiresIn: tokensPair.refreshTokenExpiresIn
    };
};