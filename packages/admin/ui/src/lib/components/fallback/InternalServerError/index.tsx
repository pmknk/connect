import { CloudAlert } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { GenericPageErrorFallback } from '../GenericPageErrorFallback';

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
        <GenericPageErrorFallback
            icon={<CloudAlert size={80} />}
            title={
                <FormattedMessage
                    id="internal-server-error"
                    defaultMessage="Internal Server Error"
                />
            }
            subtitle={
                <FormattedMessage
                    id="internal-server-error-description"
                    defaultMessage="We apologize for the inconvenience. Please try refreshing your browser or wait a moment before trying again."
                />
            }
        />
    );
};
