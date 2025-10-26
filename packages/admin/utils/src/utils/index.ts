import { AxiosError } from "axios";
import { ERROR_STATUS_CODES } from "../constants";

/**
 * Checks if the given error is an AxiosError representing a 404 Not Found error.
 *
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with a 404 status code, otherwise false.
 */
export const isNotFoundError = (error: Error): boolean => {
    return error instanceof AxiosError && error.response?.status === ERROR_STATUS_CODES.NOT_FOUND;
};

/**
 * Checks if the given error is an AxiosError representing a 500 Internal Server Error.
 *
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with a 500 status code, otherwise false.
 */
export const isInternalServerError = (error: Error): boolean => {
    return error instanceof AxiosError && error.response?.status === ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR;
};

/**
 * Checks if the given error is an AxiosError representing a 401 Unauthorized error.
 *
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with a 401 status code, otherwise false.
 */
export const isUnauthorizedError = (error: Error): boolean => {
    return error instanceof AxiosError && error.response?.status === ERROR_STATUS_CODES.UNAUTHORIZED;
};