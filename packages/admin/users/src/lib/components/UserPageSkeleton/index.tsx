import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { UserPersonalDetailsSkeleton } from './UserPersonalDetailsSkeleton';

export const UserPageSkeleton = () => {
    return (
        <>
            <Skeleton variant="text" width={200} height={36} />
            <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 2, display: 'flex', gap: 3 }}>
                    <Skeleton variant="rounded" width={80} height={36} />
                    <Skeleton variant="rounded" width={100} height={36} />
                </Box>
                <Box sx={{ py: 6 }}>
                    <Skeleton
                        variant="text"
                        width={160}
                        height={24}
                        sx={{ mb: 4 }}
                    />
                    <UserPersonalDetailsSkeleton />
                </Box>
            </Box>
        </>
    );
};
