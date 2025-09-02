import { defineMessages, useIntl } from 'react-intl';
import { Control, useWatch } from 'react-hook-form';
import { useUser } from '@avyyx/admin-utils';

import { FormSelect, FormCheckbox } from '@avyyx/admin-ui';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { type CreateProjectFormData } from '../../../../hooks/useCreateProjectForm';
import { useUsersQuery } from '../../../../hooks/useUsersQuery';
import { LoadingMenuItem } from '../LoadingMenuItem';

type UserSelectionFieldProps = {
    control: Control<CreateProjectFormData>;
    isLoading: boolean;
};

const intlMessages = defineMessages({
    users: {
        id: 'projects.create.users',
        defaultMessage: 'Users'
    },
    usersDescription: {
        id: 'projects.create.users.description',
        defaultMessage:
            'Select the users who will be able to access this project.'
    },
    usersPlaceholder: {
        id: 'projects.create.users.placeholder',
        defaultMessage: 'Select Users'
    },
    loadingMoreUsers: {
        id: 'projects.create.users.loadingMoreUsers',
        defaultMessage: 'Loading more users...'
    },
    usersSelected: {
        id: 'projects.create.users.selected',
        defaultMessage: '{count} User selected'
    },
    usersSelectedPlural: {
        id: 'projects.create.users.selected.plural',
        defaultMessage: '{count} Users selected'
    },
    selectAllUsers: {
        id: 'projects.create.users.selectAllUsers',
        defaultMessage: 'Select All available users'
    },
    noUsersFound: {
        id: 'projects.create.users.empty',
        defaultMessage: 'No users found'
    }
});

export const UserSelectionField = ({
    control,
    isLoading
}: UserSelectionFieldProps) => {
    const {
        user: { id: currentUserId }
    } = useUser();
    const { formatMessage } = useIntl();
    const { assignAvailableUsers } = useWatch({ control });

    const { users, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useUsersQuery(10);

    const handleScrollEnd = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const renderSelectedValue = (value: any) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return (
                <Typography
                    color={'text.primary'}
                    sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        opacity: 0.4
                    }}
                >
                    {formatMessage(intlMessages.usersPlaceholder)}
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
                return formatMessage(intlMessages.usersSelectedPlural, {
                    count
                });
            }
        }

        return '';
    };

    return (
        <Stack spacing={2}>
            <FormSelect
                control={control}
                name="userIds"
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
                    disabled: isLoading || assignAvailableUsers,
                    renderValue: renderSelectedValue
                }}
            >
                {users
                    .filter((user) => user.id !== currentUserId)
                    .map((user) => (
                        <MenuItem value={user.id} key={user.id}>
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
                {users.filter((user) => user.id !== currentUserId).length ===
                    0 &&
                    !isFetchingNextPage && (
                        <MenuItem disabled>
                            <Typography variant="body2" color="text.secondary">
                                {formatMessage(intlMessages.noUsersFound)}
                            </Typography>
                        </MenuItem>
                    )}
                {isFetchingNextPage && <LoadingMenuItem />}
            </FormSelect>
            <FormCheckbox
                control={control}
                name="assignAvailableUsers"
                checkboxProps={{
                    label: formatMessage(intlMessages.selectAllUsers),
                    disabled: isLoading
                }}
            />
        </Stack>
    );
};
