import { type JSONSchemaType } from 'ajv';
import { useForm } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';

export interface UserFormData {
    id: string;
    fullName: string;
    email: string;
    roleId: string;
    projectIds: string[];
}

const intlMessages = defineMessages({
    fullnameRequiredMessage: {
        id: 'users.form.fullnameRequiredMessage',
        defaultMessage: 'Fullname is required'
    },
    emailRequiredMessage: {
        id: 'users.form.emailRequiredMessage',
        defaultMessage: 'Email is required'
    },
    roleIdRequiredMessage: {
        id: 'users.form.roleIdRequiredMessage',
        defaultMessage: 'Role is required'
    },
    fullnameMaxLengthMessage: {
        id: 'users.form.fullnameMaxLengthMessage',
        defaultMessage: 'Fullname must be less than 64 characters'
    },
    emailMaxLengthMessage: {
        id: 'users.form.emailMaxLengthMessage',
        defaultMessage: 'Email must be less than 64 characters'
    },
    emailFormatMessage: {
        id: 'users.form.emailFormatMessage',
        defaultMessage: 'Email is not valid'
    }
});

/**
 * Custom hook for managing user form (edit/view) state and validation
 */
export const useUserForm = (defaultValues: UserFormData) => {
    const { formatMessage } = useIntl();

    const schema = useMemo(
        (): JSONSchemaType<UserFormData> => ({
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    // id is often not a user-editable field; keep validation minimal
                    minLength: 0
                },
                fullName: {
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
                    minLength: 1,
                    maxLength: 64,
                    pattern:
                        '^(?!.*\\.\\.)[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,}$',
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.emailRequiredMessage
                        ),
                        pattern: formatMessage(intlMessages.emailFormatMessage),
                        maxLength: formatMessage(
                            intlMessages.emailMaxLengthMessage
                        )
                    }
                },
                roleId: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.roleIdRequiredMessage
                        )
                    }
                },
                projectIds: { type: 'array', items: { type: 'string' } }
            },
            required: ['fullName', 'email', 'roleId']
        }),
        []
    );

    return useForm<UserFormData>({
        defaultValues: defaultValues || {
            projectIds: []
        },
        resolver: ajvResolver(schema, {
            allErrors: true,
            strict: true,
            $data: true
        })
    });
};
