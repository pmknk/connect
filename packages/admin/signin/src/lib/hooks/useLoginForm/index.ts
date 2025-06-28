import { useForm } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { type JSONSchemaType } from 'ajv';
import { defineMessages, useIntl } from 'react-intl';
import { useMemo } from 'react';

/**
 * Interface for login form data
 */
export interface LoginFormData {
    /** User's email address */
    email: string;
    /** User's password */
    password: string;
}

/**
 * Internationalization messages for login form validation
 */
const intlMessages = defineMessages({
    emailRequiredMessage: {
        id: 'auth.admin.pages.login.emailRequiredMessage',
        defaultMessage: 'Email is required'
    },
    passwordRequiredMessage: {
        id: 'auth.admin.pages.login.passwordRequiredMessage',
        defaultMessage: 'Password is required'
    }
});

/**
 * Custom hook for managing login form state and validation
 *
 * @returns A react-hook-form instance configured with AJV validation schema
 * @example
 * ```tsx
 * const { register, handleSubmit, formState: { errors } } = useLoginForm();
 * ```
 */
export const useLoginForm = () => {
    const { formatMessage } = useIntl();

    const schema = useMemo(
        (): JSONSchemaType<LoginFormData> => ({
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.emailRequiredMessage
                        )
                    }
                },
                password: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.passwordRequiredMessage
                        )
                    }
                }
            },
            required: ['email', 'password'],
            additionalProperties: false
        }),
        [formatMessage]
    );

    return useForm<LoginFormData>({
        resolver: ajvResolver(schema, {
            allErrors: true,
            strict: false,
            $data: true
        })
    });
};
