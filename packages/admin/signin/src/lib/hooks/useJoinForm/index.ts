import { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import { ajvResolver } from '@hookform/resolvers/ajv';
import { type JSONSchemaType } from 'ajv';
import { PASSWORD_PATTERN } from '@content/admin-utils';

export type JoinFormData = {
    code?: string;
    password?: string;
    confirmPassword?: string;
};

const intlMessages = defineMessages({
    codeRequiredMessage: {
        id: 'auth.admin.pages.join.codeRequiredMessage',
        defaultMessage: 'Invitation code is required'
    },
    passwordRequiredMessage: {
        id: 'auth.admin.pages.join.passwordRequiredMessage',
        defaultMessage: 'Password is required'
    },
    confirmPasswordRequiredMessage: {
        id: 'auth.admin.pages.join.confirmPasswordRequiredMessage',
        defaultMessage: 'Confirm Password is required'
    },
    passwordMinLengthMessage: {
        id: 'auth.admin.pages.join.passwordMinLengthMessage',
        defaultMessage: 'Password must be at least 8 characters'
    },
    confirmPasswordMismatchMessage: {
        id: 'auth.admin.pages.join.confirmPasswordMismatchMessage',
        defaultMessage: 'Passwords do not match'
    },
    passwordPatternMessage: {
        id: 'auth.admin.pages.join.passwordPatternMessage',
        defaultMessage:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
});

export const useJoinForm = (hasInvite: boolean = false) => {
    const { formatMessage } = useIntl();

    const schema = useMemo((): JSONSchemaType<JoinFormData> => {
        const base = {
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.codeRequiredMessage
                        )
                    }
                },
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
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.confirmPasswordRequiredMessage
                        )
                    }
                }
            },
            required: hasInvite ? ['password', 'confirmPassword'] : ['code'],
            additionalProperties: false
        } as const;

        const withAllOf = hasInvite
            ? {
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
                                      intlMessages.confirmPasswordMismatchMessage
                                  )
                              }
                          }
                      }
                  ]
              }
            : base;

        return withAllOf as unknown as JSONSchemaType<JoinFormData>;
    }, [formatMessage, hasInvite]);

    return useForm<JoinFormData>({
        resolver: ajvResolver(schema, {
            allErrors: true,
            strict: false,
            $data: true
        })
    });
};
