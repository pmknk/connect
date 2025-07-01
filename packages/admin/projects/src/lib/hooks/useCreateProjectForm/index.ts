import { useEffect, useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import { ajvResolver } from '@hookform/resolvers/ajv';
import { type JSONSchemaType } from 'ajv';

/**
 * Interface for create project form data
 */
export interface CreateProjectFormData {
    /** Project name */
    name: string;
    /** Project slug (URL-friendly identifier) */
    slug: string;
    /** Project description */
    description: string;
    /** Icon name for the project */
    iconName: string;
    /** Icon color for the project */
    iconColor: string;
    /** Array of user IDs associated with the project */
    users: string[];
}

/**
 * Internationalization messages for create project form validation
 */
const intlMessages = defineMessages({
    nameRequiredMessage: {
        id: 'projects.create.nameRequiredMessage',
        defaultMessage: 'Name is required'
    },
    slugRequiredMessage: {
        id: 'projects.create.slugRequiredMessage',
        defaultMessage: 'Slug is required'
    },
    nameMaxLengthMessage: {
        id: 'projects.create.nameMaxLengthMessage',
        defaultMessage: 'Name must be less than 64 characters'
    },
    slugMaxLengthMessage: {
        id: 'projects.create.slugMaxLengthMessage',
        defaultMessage: 'Slug must be less than 64 characters'
    },
    descriptionMaxLengthMessage: {
        id: 'projects.create.descriptionMaxLengthMessage',
        defaultMessage: 'Description must be less than 255 characters'
    }
});

/**
 * Custom hook for managing create project form state and validation
 *
 * Automatically generates a slug from the project name by converting to lowercase
 * and replacing non-alphanumeric characters with hyphens.
 *
 * @returns A react-hook-form instance configured with AJV validation schema
 * @example
 * ```tsx
 * const { register, handleSubmit, formState: { errors } } = useCreateProjectForm();
 * ```
 */
export const useCreateProjectForm = () => {
    const { formatMessage } = useIntl();

    const schema = useMemo(
        (): JSONSchemaType<CreateProjectFormData> => ({
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.nameRequiredMessage
                        ),
                        maxLength: formatMessage(
                            intlMessages.nameMaxLengthMessage
                        )
                    }
                },
                slug: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64,
                    errorMessage: {
                        minLength: formatMessage(
                            intlMessages.slugRequiredMessage
                        ),
                        maxLength: formatMessage(
                            intlMessages.slugMaxLengthMessage
                        )
                    }
                },
                description: {
                    type: 'string',
                    maxLength: 255,
                    errorMessage: {
                        maxLength: formatMessage(
                            intlMessages.descriptionMaxLengthMessage
                        )
                    }
                },
                iconName: { type: 'string' },
                iconColor: { type: 'string' },
                users: { type: 'array', items: { type: 'string' } }
            },
            required: ['name', 'slug'],
            additionalProperties: false
        }),
        [formatMessage]
    );

    const form = useForm<CreateProjectFormData>({
        resolver: ajvResolver(schema, {
            allErrors: true,
            strict: true,
            $data: true
        })
    });

    const name = form.watch('name');

    useEffect(() => {
        form.setValue(
            'slug',
            name ? name.toLowerCase().replace(/[^a-z0-9]/g, '-') : ''
        );
        form.clearErrors('slug');
    }, [name]);

    return form;
};
