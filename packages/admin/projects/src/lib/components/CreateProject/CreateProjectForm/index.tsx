import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Control, useWatch } from 'react-hook-form';
import { useUser } from '@avyyx/admin-utils';

import { FormCheckbox, FormField, FormSelect } from '@avyyx/admin-ui';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { type CreateProjectFormData } from '../../../hooks/useCreateProjectForm';
import { useUsersQuery } from '../../../hooks/useUsersQuery';

type CreateProjectFormProps = {
    control: Control<CreateProjectFormData>;
    isLoading: boolean;
};

const intlMessages = defineMessages({
    name: {
        id: 'projects.create.name',
        defaultMessage: 'Name'
    },
    slug: {
        id: 'projects.create.slug',
        defaultMessage: 'Slug'
    },
    slugDescription: {
        id: 'projects.create.slug.description',
        defaultMessage:
            'A unique identifier for your project that will be used in URLs and API requests. This cannot be changed once the project is created.'
    },
    description: {
        id: 'projects.create.description',
        defaultMessage: 'Description'
    },
    users: {
        id: 'projects.create.users',
        defaultMessage: 'Users'
    },
    usersDescription: {
        id: 'projects.create.users.description',
        defaultMessage:
            'Select the users who will be able to access this project.'
    },
    descriptionPlaceholder: {
        id: 'projects.create.description.placeholder',
        defaultMessage: 'My Project Description'
    },
    namePlaceholder: {
        id: 'projects.create.name.placeholder',
        defaultMessage: 'My Project'
    },
    slugPlaceholder: {
        id: 'projects.create.slug.placeholder',
        defaultMessage: 'my-project'
    },
    usersPlaceholder: {
        id: 'projects.create.users.placeholder',
        defaultMessage: 'Select Users'
    },
    usersHelperText: {
        id: 'projects.create.users.helperText'
    },
    loadingMoreUsers: {
        id: 'projects.create.users.loadingMoreUsers',
        defaultMessage: 'Loading more users...'
    },
    andMore: {
        id: 'projects.create.users.andMore',
        defaultMessage: 'and {count} more'
    },
    and: {
        id: 'projects.create.users.and',
        defaultMessage: 'and'
    },
    selectAll: {
        id: 'projects.create.users.selectAll',
        defaultMessage: 'Select All Users'
    },
    usersSelected: {
        id: 'projects.create.users.selected',
        defaultMessage: '{count} User selected'
    },
    usersSelectedPlural: {
        id: 'projects.create.users.selected.plural',
        defaultMessage: '{count} Users selected'
    }
});

export const CreateProjectForm = ({
    control,
    isLoading
}: CreateProjectFormProps) => {
    const { user: { id: currentUserId } } = useUser()
    const { formatMessage } = useIntl();
    const { allUsersSelected } = useWatch({ control });

    const {
        users,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useUsersQuery(10);

    const handleScrollEnd = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <Stack spacing={3}>
            <FormField
                control={control}
                name="name"
                inputProps={{
                    labelPlacement: 'outside',
                    label: formatMessage(intlMessages.name),
                    type: 'text',
                    placeholder: formatMessage(intlMessages.namePlaceholder),
                    disabled: isLoading
                }}
            />
            <FormField
                control={control}
                name="slug"
                inputProps={{
                    labelPlacement: 'outside',
                    label: formatMessage(intlMessages.slug),
                    type: 'text',
                    placeholder: formatMessage(intlMessages.slugPlaceholder),
                    disabled: isLoading,
                    helperText: (
                        <FormattedMessage
                            id="projects.create.slug.description"
                            defaultMessage="A unique identifier for your project that will be used in URLs and API requests. This cannot be changed once the project is created."
                        />
                    )
                }}
            />
            <FormField
                control={control}
                name="description"
                inputProps={{
                    labelPlacement: 'outside',
                    label: formatMessage(intlMessages.description),
                    placeholder: formatMessage(
                        intlMessages.descriptionPlaceholder
                    ),
                    disabled: isLoading,
                    multiline: true,
                    rows: 4
                }}
            />
            <Stack spacing={1}>
                <FormSelect
                    control={control}
                    name="users"
                    selectProps={{
                        MenuProps: {
                            PaperProps: {
                                sx: {
                                    maxHeight: '200px'
                                }
                            }
                        },
                        onScrollEnd: handleScrollEnd,
                        labelPlacement: 'outside',
                        label: formatMessage(intlMessages.users),
                        helperText: formatMessage(intlMessages.usersDescription),
                        displayEmpty: true,
                        multiple: true,
                        disabled: isLoading || allUsersSelected,
                        renderValue: (value) => {
                            if (
                                !value ||
                                (Array.isArray(value) && value.length === 0)
                            ) {
                                return (
                                    <Typography
                                        color={'text.primary'}
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            opacity: 0.4
                                        }}
                                    >
                                        {formatMessage(
                                            intlMessages.usersPlaceholder
                                        )}
                                    </Typography>
                                );
                            }


                            if (Array.isArray(value)) {
                                const selectedUsers = users.filter((user) =>
                                    value.includes(user.id)
                                );
                                const count = selectedUsers.length;
                                
                                if (count === 0) {
                                    return '';
                                } else if (count === 1) {
                                    return formatMessage(intlMessages.usersSelected, { count: 1 });
                                } else {
                                    return formatMessage(intlMessages.usersSelectedPlural, { count });
                                }
                            }

                            return '';
                        }
                    }}
                >
                    {users.filter((user) => user.id !== currentUserId).map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Typography variant="body2">
                                    {user.fullName}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {user.email}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                    {isFetchingNextPage && (
                        <MenuItem disabled>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <CircularProgress size={16} />
                                <Typography variant="body2">
                                    {formatMessage(intlMessages.loadingMoreUsers)}
                                </Typography>
                            </Box>
                        </MenuItem>
                    )}
                </FormSelect>
                <FormCheckbox
                    control={control}
                    name="allUsersSelected"
                    checkboxProps={{
                        label: 'Select All',
                        disabled: isLoading
                    }}
                />
            </Stack>
        </Stack>
    );
};
