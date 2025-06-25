import { CloudXmark } from 'iconoir-react';
import { GenericErrorFallback } from '../GenericErrorFallback';

/**
 * InternalServerError component for displaying 500 error states
 * 
 * Renders a user-friendly error page for internal server errors using
 * the GenericErrorFallback component with appropriate messaging and styling.
 * 
 * @returns A GenericErrorFallback component configured for internal server errors
 */
export const InternalServerError = () => {
    return (
        <GenericErrorFallback
            icon={<CloudXmark className="h-20 w-20 mx-auto text-primary" />}
            titleId="internal-server-error"
            titleDefaultMessage="Internal Server Error"
            subtitleId="internal-server-error-description"
            subtitleDefaultMessage="We apologize for the inconvenience. Please try refreshing your browser or wait a moment before trying again."
        />
    );
};