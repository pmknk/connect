import { ReactNode } from 'react';
import { Typography } from '@material-tailwind/react';

/**
 * Props for the GenericErrorFallback component
 */
interface GenericErrorFallbackProps {
    icon?: ReactNode;
    title: string | ReactNode;
    subtitle: string | ReactNode;
    actions?: ReactNode;
    className?: string;
}

/**
 * A generic error fallback component for displaying user-friendly error pages
 *
 * This component provides a consistent layout for error states with optional
 * icon, internationalized title and subtitle, and action buttons. It's designed
 * to be used as a fallback for various error scenarios throughout the application.
 *
 * @param props - The component props
 * @param props.icon - Optional icon element to display above the error message
 * @param props.titleId - Internationalization ID for the error title
 * @param props.titleDefaultMessage - Default message for the error title if translation is not found
 * @param props.subtitleId - Internationalization ID for the error subtitle/description
 * @param props.subtitleDefaultMessage - Default message for the error subtitle if translation is not found
 * @param props.actions - Optional action buttons or elements to display below the error message
 * @param props.className - Additional CSS classes to apply to the container
 * @returns A centered error page layout with icon, title, subtitle, and optional actions
 */
export const GenericPageErrorFallback = ({
    icon,
    title,
    subtitle,
    actions,
    className = ''
}: GenericErrorFallbackProps) => {
    return (
        <section
            className={`min-h-screen grid place-items-center ${className}`}
        >
            <div className="container mx-auto">
                <div className="text-center flex flex-col items-center">
                    {icon && icon}
                    <Typography
                        as="h4"
                        type="h4"
                        className="mt-8 mb-6 font-normal"
                    >
                        {title}
                    </Typography>
                    <Typography
                        type="lead"
                        className="text-foreground max-w-xl mx-auto"
                    >
                        {subtitle}
                    </Typography>
                    {actions && <div className="mt-8">{actions}</div>}
                </div>
            </div>
        </section>
    );
};
