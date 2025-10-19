import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Control } from 'react-hook-form';
import { useUser } from '@connect/admin-utils';

import { FormSelect, SelectedValue, LoadingMoreOptions, SearchMenuItem } from '@connect/admin-ui';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { type CreateProjectFormData } from '../../hooks/useCreateProjectForm';
import { useUsersQuery } from '../../hooks/useUsersQuery';

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
        defaultMessage: 'Loading users...'
    },
    usersSelected: {
        id: 'projects.create.users.selected',
        defaultMessage: '{count} User selected'
    },
    usersSelectedPlural: {
        id: 'projects.create.users.selected.plural',
        defaultMessage: '{count} Users selected'
    },
    noUsersFound: {
        id: 'projects.create.users.empty',
        defaultMessage: 'No users found'
    },
    searchUsers: {
        id: 'projects.create.users.search',
        defaultMessage: 'Search users'
    }
});

const USER_LIMIT = 20;

export const UserSelectionField = ({
    control,
    isLoading
}: UserSelectionFieldProps) => {
    const {
        user: { id: currentUserId }
    } = useUser();
    const { formatMessage } = useIntl();

    const [search, setSearch] = useState('');
    const { users, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useUsersQuery(USER_LIMIT, search);

    const handleScrollEnd = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <Stack spacing={1}>
            <FormSelect
                control={control}
                name="userIds"
                selectProps={{
                    MenuProps: {
                        PaperProps: {
                            sx: {
                                maxHeight: '200px'
                            }
                        },
                        MenuListProps: {
                            autoFocusItem: false
                        }
                    },
                    onScrollEnd: handleScrollEnd,
                    labelPlacement: 'outside',
                    label: formatMessage(intlMessages.users),
                    helperText: formatMessage(intlMessages.usersDescription),
                    displayEmpty: true,
                    multiple: true,
                    disabled: isLoading,
                    renderValue: (value: any) => {
                        return <SelectedValue
                            value={value}
                            messages={{
                                placeholder: formatMessage(intlMessages.usersPlaceholder),
                                single: (count: number) => formatMessage(intlMessages.usersSelected, { count }),
                                plural: (count: number) => formatMessage(intlMessages.usersSelectedPlural, { count })
                            }}
                        />
                    }
                }}
            >
                <SearchMenuItem
                    textFieldProps={{
                        placeholder: formatMessage(intlMessages.searchUsers),
                        onChange: (e) => {
                            setSearch(e.target.value);
                        },
                        value: search
                    }}
                />
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
                    !isFetchingNextPage && !isFetching && (
                        <MenuItem disabled>
                            <Typography variant="body2" color="text.secondary">
                                {formatMessage(intlMessages.noUsersFound)}
                            </Typography>
                        </MenuItem>
                    )}
                {(isFetchingNextPage || isFetching) && <LoadingMoreOptions label={formatMessage(intlMessages.loadingMoreUsers)} />}
            </FormSelect>
        </Stack>
    );
};
