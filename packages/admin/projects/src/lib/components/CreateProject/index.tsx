import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import { ExtendedTheme } from '@connect/admin-ui';

import { PermissionAccess, useSnackbar } from '@connect/admin-utils';
import { CreateProjectForm } from './CreateProjectForm';
import { useCreateProjectForm } from '../../hooks/useCreateProjectForm';
import { CreateProjectDialog } from './CreateProjectDialog';
import { useCreateProjectsMutation } from '../../hooks/useCreateProjectsMutation';

type CreateProjectProps = {
    onSuccess?: () => void;
};

const intlMessages = defineMessages({
    title: {
        id: 'projects.create.title',
        defaultMessage: 'Create Project'
    },
    cancel: {
        id: 'projects.create.cancel',
        defaultMessage: 'Cancel'
    },
    button: {
        id: 'projects.create.button',
        defaultMessage: 'Create'
    },
    projectCreated: {
        id: 'projects.create.projectCreated',
        defaultMessage: 'Project has been created successfully'
    }
});

export const CreateProject = ({ onSuccess }: CreateProjectProps) => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const { control, handleSubmit, reset } = useCreateProjectForm();
    const { showSnackbar } = useSnackbar();
    const { mutate: createProject, isPending } = useCreateProjectsMutation(() => {
        showSnackbar({ message: formatMessage(intlMessages.projectCreated), severity: 'success' });
        handleClose();
        onSuccess?.();
    });
    const { formatMessage } = useIntl();

    const handleClose = () => {
        setOpen(false);
        reset({
            name: '',
            slug: '',
            description: '',
            userIds: [],
        });
    };

    return (
        <>
            <PermissionAccess
                permissions={[{ action: 'create', resource: 'admin:project' }]}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        width: isMobile ? '100%' : '150px'
                    }}
                    onClick={() => setOpen(true)}
                >
                    {formatMessage(intlMessages.title)}
                </Button>
            </PermissionAccess>
            <CreateProjectDialog
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit((data) => {
                    createProject(data);
                })}
                content={
                    <CreateProjectForm
                        control={control}
                        isLoading={isPending}
                    />
                }
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="text"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            {formatMessage(intlMessages.cancel)}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={isPending}
                        >
                            {formatMessage(intlMessages.button)}
                        </Button>
                    </Stack>
                }
            />
        </>
    );
};
