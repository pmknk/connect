import { TokensPair } from "../services/signin.service";

export type SigninDto = {
    email: string;
    password: string;
};

export type SigninResponseDto = {
    data: {
        accessToken: string;
        accessTokenExpiresIn: number;
        refreshToken: string;
        refreshTokenExpiresIn: number;
    }
};

export const toSigninResponseDto = (tokensPair: TokensPair): SigninResponseDto => {
    return {
        data: tokensPair
    };
};