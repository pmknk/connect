import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { PermissionAccess } from '@avyyx/admin-utils';
import { CreateProjectForm } from './CreateProjectForm';
import { useCreateProjectForm } from '../../hooks/useCreateProjectForm';
import { CreateProjectDialog } from './CreateProjectDialog';
import { useCreateProjectsMutation } from '../../hooks/useCreateProjectsMutation';

type CreateProjectProps = {
    onSuccess?: () => void;
};

export const CreateProject = ({ onSuccess }: CreateProjectProps) => {
    const [open, setOpen] = useState(false);
    const { control, handleSubmit, reset } = useCreateProjectForm();
    const { mutate: createProject, isPending } = useCreateProjectsMutation();

    const handleClose = () => {
        setOpen(false);
        reset({
            name: '',
            slug: '',
            description: '',
            userIds: [],
            assignAvailableUsers: false
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
                        width: '150px',
                    }}
                    onClick={() => setOpen(true)}
                >
                    <FormattedMessage
                        id="projects.create.title"
                        defaultMessage="Create Project"
                    />
                </Button>
            </PermissionAccess>
            <CreateProjectDialog
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit((data) => {
                    createProject(data, {
                        onSuccess: () => {
                            handleClose();
                            onSuccess?.();
                        }
                    });
                })}
                content={
                    <CreateProjectForm control={control} isLoading={isPending} />
                }
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="text"
                            color="error"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            <FormattedMessage
                                id="projects.create.cancel"
                                defaultMessage="Cancel"
                            />
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={isPending}
                        >
                            <FormattedMessage
                                id="projects.create.button"
                                defaultMessage="Create"
                            />
                        </Button>
                    </Stack>
                }
            />
        </>
    );
};
