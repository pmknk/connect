import { FolderX } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { ExtendedTheme } from '@avyyx/admin-ui';

import { CreateProject } from '../CreateProject';
import { Box } from '@mui/material';

type NoProjectsFoundCtaProps = {
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    showCreateProject?: boolean;
    onSuccess?: () => void;
};

export const NoProjectsFoundCta = ({
    onSuccess,
    title,
    description,
    showCreateProject = true
}: NoProjectsFoundCtaProps) => {
    const { palette } = useTheme<ExtendedTheme>();
    return (
        <Stack
            direction="column"
            gap={1}
            alignItems="center"
            justifyContent="center"
            height="calc(100vh - 300px)"
            textAlign="center"
        >
            <FolderX size={60} color={palette.primary.main} strokeWidth={1} />
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1" color="text.secondary">
                {description}
            </Typography>
            {showCreateProject && (
                <Box sx={{ mt: 2 }}>
                    <CreateProject onSuccess={onSuccess} />
                </Box>
            )}
        </Stack>
    );
};
