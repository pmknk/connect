import { Context, createContext } from 'react';

/**
 * Context value provided by the ErrorBoundary.
 * @property {(error: Error) => void} showError - Function to trigger an error manually.
 * @property {() => void} reload - Function to reload the wrapped component.
 */
export interface ErrorBoundaryContextValue {
    showError: (error: Error | null) => void;
    reload: () => void;
}

/**
 * Context for managing errors and reloads in the ErrorBoundary.
 */
export const ErrorBoundaryContext: Context<ErrorBoundaryContextValue> =
    createContext({} as ErrorBoundaryContextValue);
