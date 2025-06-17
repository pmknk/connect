import React, { Component, ReactNode } from 'react';
import { ErrorBoundaryContext } from '../../contexts/ErrorBoundary';

/**
 * Props passed to the fallback component.
 * @property {Error | null} error - The error object that caused the boundary to fail.
 * @property {() => void} reload - Function to reload the wrapped component.
 */
export interface ErrorBoundaryFallbackProps {
    error: Error | null;
    reload: () => void;
}

/**
 * Props for the ErrorBoundary component.
 * @property {React.ComponentType<ErrorBoundaryFallbackProps>} fallback - The fallback component to display when an error occurs.
 * @property {ReactNode} children - The children components to be wrapped by the error boundary.
 */
interface ErrorBoundaryProps {
    fallback: React.ComponentType<ErrorBoundaryFallbackProps>;
    children: ReactNode;
}

/**
 * State for the ErrorBoundary component.
 * @property {boolean} hasError - Indicates if an error has occurred.
 * @property {Error | null} error - The error object, if any.
 * @property {boolean} shouldReload - Indicates if the wrapped component should reload.
 */
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    shouldReload: boolean;
}

/**
 * A React component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the crashed component tree.
 *
 * The `ErrorBoundary` can also manually trigger fallback rendering via a provided context.
 */
export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    /**
     * Initializes the ErrorBoundary component with default state.
     * @param {ErrorBoundaryProps} props - The props for the component.
     */
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            shouldReload: false
        };
    }

    /**
     * Updates the state when an error is caught during rendering.
     * @param {Error} error - The error object that was thrown.
     * @returns {Partial<ErrorBoundaryState>} The updated state with the error details.
     */
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error };
    }

    /**
     * Resets the error boundary state to clear any existing errors.
     */
    resetErrorBoundary = (): void => {
        this.setState({ hasError: false, error: null });
    };

    /**
     * Triggers an error manually, causing the fallback component to be rendered.
     * @param {Error} error - The error object to trigger.
     */
    showError = (error: Error): void => {
        this.setState({ hasError: true, error });
    };

    /**
     * Reloads the wrapped component by resetting the reload state.
     */
    reloadComponent = (): void => {
        this.setState(
            { shouldReload: true, hasError: false, error: null },
            () => {
                this.setState({ shouldReload: false });
            }
        );
    };

    /**
     * Renders the fallback component or the children based on the error boundary state.
     * @returns {ReactNode} The rendered fallback component or child components.
     */
    override render(): ReactNode {
        const { hasError, error, shouldReload } = this.state;
        const { fallback: FallbackComponent, children } = this.props;

        if (hasError && !shouldReload) {
            return (
                <ErrorBoundaryContext.Provider
                    value={{
                        showError: this.showError,
                        reload: this.reloadComponent
                    }}
                >
                    <FallbackComponent
                        error={error}
                        reload={this.reloadComponent}
                    />
                </ErrorBoundaryContext.Provider>
            );
        }

        return (
            <ErrorBoundaryContext.Provider
                value={{
                    showError: this.showError,
                    reload: this.reloadComponent
                }}
            >
                {children}
            </ErrorBoundaryContext.Provider>
        );
    }
}
