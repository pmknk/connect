import { TokensPair } from "../services/signin.service";

export type TokenResponseDto = {
    data: {
        accessToken: string;
        accessTokenExpiresIn: number;
        refreshToken: string;
        refreshTokenExpiresIn: number;
    }
};

export const toTokenResponseDto = (tokensPair: TokensPair): TokenResponseDto => {
    return {
        data: tokensPair
    };
};