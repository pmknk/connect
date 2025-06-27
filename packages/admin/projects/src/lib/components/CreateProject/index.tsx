import {
    Dialog,
    Button,
    Typography,
    IconButton
} from '@material-tailwind/react';
import { X } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

export const CreateProject = () => {
    return (
        <Dialog size="sm">
            <Dialog.Trigger as={Button}>
                <FormattedMessage
                    id="projects.create.title"
                    defaultMessage="Create Project"
                />
            </Dialog.Trigger>
            <Dialog.Overlay>
                <Dialog.Content>
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
                    <Typography className="mb-6 mt-2 text-foreground">
                        Material Tailwind is an open-source library that uses
                        the power of Tailwind CSS and React to help you build
                        unique web projects faster and easier. The stunning
                        design inspired by Material Design is a bonus! Get
                        Material Tailwind and take advantage of its free
                        components and features that will help you set up your
                        web project quickly.
                    </Typography>
                    <div className="mb-1 flex items-center justify-end gap-2">
                        <Dialog.DismissTrigger
                            as={Button}
                            variant="ghost"
                            color="error"
                        >
                            Cancel
                        </Dialog.DismissTrigger>
                        <Button>Get Started</Button>
                    </div>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog>
    );
};
