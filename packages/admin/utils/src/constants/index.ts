export const PASSWORD_PATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$';

export const ERROR_STATUS_CODES = {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401
} as const;