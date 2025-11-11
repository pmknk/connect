import { ajvResolver } from '@hookform/resolvers/ajv';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { defineMessages, useIntl } from 'react-intl';
import { type JSONSchemaType } from 'ajv';
import { PASSWORD_PATTERN } from '@content/admin-utils';

export type UpdatePasswordFormData = {
    password: string;
    confirmPassword: string;
};

const intlMessages = defineMessages({
    passwordRequiredMessage: {
        id: 'users.updatePassword.passwordRequiredMessage',
        defaultMessage: 'Password is required'
    },
    confirmPasswordRequiredMessage: {
        id: 'users.updatePassword.confirmPasswordRequiredMessage',
        defaultMessage: 'Confirm Password is required'
    },
    passwordMinLengthMessage: {
        id: 'users.updatePassword.passwordMinLengthMessage',
        defaultMessage: 'Password must be at least 8 characters'
    },
    confirmPasswordMinLengthMessage: {
        id: 'users.updatePassword.confirmPasswordMinLengthMessage',
        defaultMessage: 'Confirm Password must be at least 8 characters'
    },
    passwordPatternMessage: {
        id: 'users.updatePassword.passwordPatternMessage',
        defaultMessage:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    },
    confirmPasswordPatternMessage: {
        id: 'users.updatePassword.confirmPasswordPatternMessage',
        defaultMessage:
            'Confirm Password must contain at least one uppercase letter, one lowercase letter, and one number'
    },
    passwordConfirmPasswordMismatchMessage: {
        id: 'users.updatePassword.passwordConfirmPasswordMismatchMessage',
        defaultMessage: 'Passwords do not match'
    }
});

export const useUpdatePasswordForm = () => {
    const { formatMessage } = useIntl();

    const schema = useMemo((): JSONSchemaType<UpdatePasswordFormData> => {
        const base = {
            type: 'object',
            properties: {
                password: {
                    type: 'string',
                    minLength: 8,
                    pattern: PASSWORD_PATTERN,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.passwordMinLengthMessage
                        ),
                        pattern: formatMessage(
                            intlMessages.passwordPatternMessage
                        )
                    }
                },
                confirmPassword: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.confirmPasswordMinLengthMessage
                        )
                    }
                }
            },
            required: ['password', 'confirmPassword'],
            additionalProperties: false,
            errorMessage: {
                properties: {
                    password: formatMessage(
                        intlMessages.passwordRequiredMessage
                    ),
                    confirmPassword: formatMessage(
                        intlMessages.confirmPasswordRequiredMessage
                    )
                }
            }
        } as const;

        const withAllOf = {
            ...base,
            allOf: [
                {
                    properties: {
                        confirmPassword: {
                            const: { $data: '1/password' }
                        }
                    },
                    errorMessage: {
                        properties: {
                            confirmPassword: formatMessage(
                                intlMessages.passwordConfirmPasswordMismatchMessage
                            )
                        }
                    }
                }
            ]
        };

        return withAllOf as unknown as JSONSchemaType<UpdatePasswordFormData>;
    }, [formatMessage]);

    return useForm<UpdatePasswordFormData>({
        resolver: ajvResolver(schema, {
            allErrors: true,
            strict: false,
            $data: true
        })
    });
};
