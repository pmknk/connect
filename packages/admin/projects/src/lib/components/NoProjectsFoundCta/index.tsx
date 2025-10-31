import { Box as BoxIcon } from 'lucide-react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';
import { ExtendedTheme } from '@content/admin-ui';

import { CreateProject } from '../CreateProject';

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
        <Card variant="outlined" sx={{
            borderRadius: 2,
            py: 10,
            mt: 4
        }}>
            <Stack
                direction="column"
                gap={1}
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <BoxIcon size={60} color={palette.primary.main} strokeWidth={1} />
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1" color="text.secondary" maxWidth="600px">
                    {description}
                </Typography>
                {showCreateProject && (
                    <Box sx={{ mt: 2 }}>
                        <CreateProject onSuccess={onSuccess} />
                    </Box>
                )}
            </Stack>
        </Card>
    );
};
