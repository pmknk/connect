import { useContext } from 'react';
import { ErrorBoundaryContext } from '../../contexts/ErrorBoundary';

export const useErrorBoundary = () => {
    const context = useContext(ErrorBoundaryContext);

    if (!context) {
        throw new Error(
            'useErrorBoundary must be used within an ErrorBoundary'
        );
    }

    return context;
};
