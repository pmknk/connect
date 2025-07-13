import { FolderX } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { ExtendedTheme } from '@avyyx/admin-ui';

import { CreateProject } from '../CreateProject';

export const NoProjectsFoundCta = () => {
    const { palette } = useTheme<ExtendedTheme>();
    return (
        <Stack
            direction="column"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            height="calc(100vh - 170px)"
            textAlign="center"
        >
            <FolderX size={60} color={palette.primary.main} strokeWidth={1} />
            <Typography variant="h5">
                <FormattedMessage
                    id="projects.empty"
                    defaultMessage="No projects found"
                />
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                <FormattedMessage
                    id="projects.empty.description"
                    defaultMessage="You don't have any projects you are working on"
                />
            </Typography>
            <CreateProject />
        </Stack>
    );
};
