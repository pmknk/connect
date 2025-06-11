import { createError } from '@fastify/error';

export const ERROR_STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409
} as const;

export const ERROR_MESSAGES = {
    BAD_REQUEST: 'Bad Request:',
    UNAUTHORIZED: 'Unauthorized:',
    FORBIDDEN: 'Forbidden:',
    NOT_FOUND: 'Not Found:',
    CONFLICT: 'Conflict:'
} as const;

export const ERROR_TYPES = {
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT'
} as const;

export const BadRequestError = createError(
    ERROR_TYPES.BAD_REQUEST,
    ERROR_MESSAGES.BAD_REQUEST,
    ERROR_STATUS_CODES.BAD_REQUEST
);
export const UnauthorizedError = createError(
    ERROR_TYPES.UNAUTHORIZED,
    ERROR_MESSAGES.UNAUTHORIZED,
    ERROR_STATUS_CODES.UNAUTHORIZED
);
export const ForbiddenError = createError(
    ERROR_TYPES.FORBIDDEN,
    ERROR_MESSAGES.FORBIDDEN,
    ERROR_STATUS_CODES.FORBIDDEN
);
export const NotFoundError = createError(
    ERROR_TYPES.NOT_FOUND,
    ERROR_MESSAGES.NOT_FOUND,
    ERROR_STATUS_CODES.NOT_FOUND
);
export const ConflictError = createError(
    ERROR_TYPES.CONFLICT,
    ERROR_MESSAGES.CONFLICT,
    ERROR_STATUS_CODES.CONFLICT
);
