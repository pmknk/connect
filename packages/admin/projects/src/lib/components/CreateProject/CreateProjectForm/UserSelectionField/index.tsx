import { defineMessages, useIntl } from 'react-intl';
import { Control, useWatch } from 'react-hook-form';
import { useUser } from '@avyyx/admin-utils';

import { FormSelect, FormCheckbox } from '@avyyx/admin-ui';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { type CreateProjectFormData } from '../../../../hooks/useCreateProjectForm';
import { useUsersQuery } from '../../../../hooks/useUsersQuery';
import { UserMenuItem } from '../UserMenuItem';
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
    }
});

export const UserSelectionField = ({
    control,
    isLoading
}: UserSelectionFieldProps) => {
    const { user: { id: currentUserId } } = useUser();
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

    const renderSelectedValue = (value: any) => {
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
                return formatMessage(intlMessages.usersSelectedPlural, { count });
            }
        }

        return '';
    };

    return (
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
                    renderValue: renderSelectedValue
                }}
            >
                {users.filter((user) => user.id !== currentUserId).map((user) => (
                    <UserMenuItem key={user.id} user={user} />
                ))}
                {isFetchingNextPage && <LoadingMenuItem />}
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
    );
}; 