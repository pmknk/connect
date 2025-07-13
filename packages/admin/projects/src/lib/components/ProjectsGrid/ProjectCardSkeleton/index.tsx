import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

import { Divider, Stack, useTheme } from "@mui/material";
import { ExtendedTheme } from "@avyyx/admin-ui";

export const ProjectCardSkeleton = () => {
    const { palette } = useTheme<ExtendedTheme>();

    return (
        <Card elevation={0} sx={{ 
            border: `1px solid ${palette.divider}`,
            borderRadius: 2
        }}>
            <CardContent sx={{
                '&.MuiCardContent-root': {
                    p: 2,
                    '&:last-child': {
                        paddingBottom: 2
                    }
                }
            }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Skeleton variant="rounded" width={40} height={40} />
                    <Stack>
                        <Skeleton variant="text" width={120} height={24} />
                        <Skeleton variant="text" width={100} height={20} />
                    </Stack>
                </Stack>
                <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={60} 
                    sx={{ mt: 2, borderRadius: 1 }}
                />
                <Divider sx={{ mt: 2 }} />
                <Stack spacing={0.2} sx={{ mt: 2 }}>
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={140} height={16} />
                </Stack>
            </CardContent>
        </Card>
    );
}; 