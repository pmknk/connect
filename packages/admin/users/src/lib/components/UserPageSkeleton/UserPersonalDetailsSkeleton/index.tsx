import { Box, Skeleton, Stack } from '@mui/material';

export const UserPersonalDetailsSkeleton = () => {
    return (
        <Stack spacing={3} sx={{ maxWidth: '500px' }}>
            <Stack spacing={6} direction="row">
                <Skeleton
                    variant="rounded"
                    width={135}
                    height={100}
                    sx={{ borderRadius: 2 }}
                />
                <Stack spacing={3} width="100%">
                    <Box>
                        <Skeleton width={120} height={16} sx={{ mb: 1 }} />
                        <Skeleton variant="rounded" height={48} />
                    </Box>
                    <Box>
                        <Skeleton width={80} height={16} sx={{ mb: 1 }} />
                        <Skeleton variant="rounded" height={48} />
                    </Box>
                </Stack>
            </Stack>
            <Box>
                <Skeleton width={80} height={16} sx={{ mb: 1 }} />
                <Skeleton variant="rounded" height={48} />
            </Box>
            <Skeleton variant="rounded" height={48} />
            <Skeleton variant="rounded" height={48} />
            <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Skeleton variant="rounded" width={120} height={36} />
            </Stack>
            <Skeleton variant="rounded" height={120} />
        </Stack>
    );
};
