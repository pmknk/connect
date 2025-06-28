import {
    Dialog,
    Button,
    Typography,
    IconButton
} from '@material-tailwind/react';
import { X } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { CreateProjectForm } from './CreateProjectForm';
import {
    CreateProjectFormData,
    useCreateProjectForm
} from '../../hooks/useCreateProjectForm';

export const CreateProject = () => {
    const { control, handleSubmit, reset } = useCreateProjectForm();
    const isLoading = false;

    return (
        <Dialog size="sm">
            <Dialog.Trigger as={Button}>
                <FormattedMessage
                    id="projects.create.title"
                    defaultMessage="Create Project"
                />
            </Dialog.Trigger>
            <Dialog.Overlay>
                <form
                    onSubmit={handleSubmit(
                        (formData: CreateProjectFormData) => {
                            console.log(formData);
                        }
                    )}
                >
                    <Dialog.Content className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <Typography type="h6">
                                <FormattedMessage
                                    id="projects.create.title"
                                    defaultMessage="Create Project"
                                />
                            </Typography>
                            <Dialog.DismissTrigger
                                as={IconButton}
                                size="sm"
                                variant="ghost"
                                isCircular
                                color="secondary"
                                className="absolute right-2 top-2"
                            >
                                <X size={20} />
                            </Dialog.DismissTrigger>
                        </div>
                        <CreateProjectForm
                            control={control}
                            isLoading={isLoading}
                        />
                        <div className="mb-1 flex items-center justify-end gap-2">
                            <Dialog.DismissTrigger
                                as={Button}
                                variant="ghost"
                                color="error"
                            >
                                Cancel
                            </Dialog.DismissTrigger>
                            <Button type="submit">Get Started</Button>
                        </div>
                    </Dialog.Content>
                </form>
            </Dialog.Overlay>
        </Dialog>
    );
};
