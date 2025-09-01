import { type JSONSchemaType } from 'ajv';
import { useForm } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';

/**
 * Interface for create user form data
 */
export interface CreateUserFormData {
    fullname: string
    email: string
    roleId: string
    projectIds: string[]
}

const intlMessages = defineMessages({
    fullnameRequiredMessage: {
        id: 'users.create.fullnameRequiredMessage',
        defaultMessage: 'Fullname is required'
    },

    emailRequiredMessage: {
        id: 'users.create.emailRequiredMessage',
        defaultMessage: 'Email is required'
    },
    roleIdRequiredMessage: {
        id: 'users.create.roleIdRequiredMessage',
        defaultMessage: 'Role is required'
    },
    fullnameMaxLengthMessage: {
        id: 'users.create.fullnameMaxLengthMessage',
        defaultMessage: 'Fullname must be less than 64 characters'
    },
    emailMaxLengthMessage: {
        id: 'users.create.emailMaxLengthMessage',
        defaultMessage: 'Email must be less than 64 characters'
    },
    emailFormatMessage: {
        id: 'users.create.emailFormatMessage',
        defaultMessage: 'Email is not valid'
    },
})

/**
 * Custom hook for managing create user form state and validation
 */
export const useCreateUserForm = () => {
    const { formatMessage } = useIntl();

    const schema = useMemo(
        (): JSONSchemaType<CreateUserFormData> => ({
            type: 'object',
            properties: {
                fullname: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.fullnameRequiredMessage
                        ),
                        maxLength: formatMessage(
                            intlMessages.fullnameMaxLengthMessage
                        )
                    }
                },
                email: {
                    type: 'string',
                    format: 'email',
                    minLength: 1,
                    maxLength: 64,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.emailRequiredMessage
                        ),
                        format: formatMessage(
                            intlMessages.emailFormatMessage
                        ),
                        maxLength: formatMessage(
                            intlMessages.emailMaxLengthMessage
                        )
                    }
                },
                roleId: {
                    type: 'string',
                    errorMessage: {
                        required: formatMessage(
                            intlMessages.roleIdRequiredMessage
                        )
                    }
                },
                projectIds: { type: 'array', items: { type: 'string' } }
            },
            required: ['fullname', 'email', 'roleId']
        }),
        []
    );
    return useForm<CreateUserFormData>({
        defaultValues: {
            projectIds: [],
        },
        resolver: ajvResolver(schema, {
            allErrors: true,
            strict: true,
            $data: true
        })
    });
}