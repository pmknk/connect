import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';

import { CreateProjectForm } from './CreateProjectForm';
import {
    useCreateProjectForm
} from '../../hooks/useCreateProjectForm';
import { CreateProjectDialog } from './CreateProjectDialog';
import Stack from '@mui/material/Stack';

export const CreateProject = () => {
    const [open, setOpen] = useState(false);
    const { control, handleSubmit, reset } = useCreateProjectForm();

    const handleClose = () => {
        setOpen(false);
        reset({
            name: '',
            description: '',
            users: [],
            allUsersSelected: false,
        });
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                <FormattedMessage
                    id="projects.create.title"
                    defaultMessage="Create Project"
                />
            </Button>
            <CreateProjectDialog
                open={open}
                onClose={handleClose}
                content={(
                    <CreateProjectForm
                        control={control}
                        isLoading={false}
                     />
                )}
                actions={(
                    <Stack direction="row" spacing={1}>
                        <Button variant="text" color="error" onClick={handleClose}>
                            <FormattedMessage
                                id="projects.create.cancel"
                                defaultMessage="Cancel"
                            />
                        </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit((data) => {
                        console.log(data)
                    })}>
                        <FormattedMessage
                            id="projects.create.button"
                            defaultMessage="Create"
                        />
                    </Button>
                    </Stack>
                )}
            />
        </>
    )
    
    // return (
    //     <Dialog size="sm">
    //         <Dialog.Trigger as={Button}>
    //             <FormattedMessage
    //                 id="projects.create.title"
    //                 defaultMessage="Create Project"
    //             />
    //         </Dialog.Trigger>
    //         <Dialog.Overlay>
    //             <form
    //                 onSubmit={handleSubmit(
    //                     (formData: CreateProjectFormData) => {
    //                         console.log(formData);
    //                     }
    //                 )}
    //             >
    //                 <Dialog.Content className="space-y-4">
    //                     <div className="flex items-center justify-between gap-4">
    //                         <Typography type="h6">
    //                             <FormattedMessage
    //                                 id="projects.create.title"
    //                                 defaultMessage="Create Project"
    //                             />
    //                         </Typography>
    //                         <Dialog.DismissTrigger
    //                             as={IconButton}
    //                             size="sm"
    //                             variant="ghost"
    //                             isCircular
    //                             color="secondary"
    //                             className="absolute right-2 top-2"
    //                         >
    //                             <X size={20} />
    //                         </Dialog.DismissTrigger>
    //                     </div>
    //                     <CreateProjectForm
    //                         control={control}
    //                         isLoading={isLoading}
    //                     />
    //                     <div className="mb-1 flex items-center justify-end gap-2">
    //                         <Dialog.DismissTrigger
    //                             as={Button}
    //                             variant="ghost"
    //                             color="error"
    //                         >
    //                             Cancel
    //                         </Dialog.DismissTrigger>
    //                         <Button type="submit">Get Started</Button>
    //                     </div>
    //                 </Dialog.Content>
    //             </form>
    //         </Dialog.Overlay>
    //     </Dialog>
    // );
};
