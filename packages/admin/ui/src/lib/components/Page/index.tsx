import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material';
import type { ContainerProps } from '@mui/material/Container';

import type { ExtendedTheme } from '../../types';

export type PageProps = {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    maxWidth?: ContainerProps['maxWidth'];
    containerSx?: SxProps;
    headerSx?: SxProps;
    contentSx?: SxProps;
    titleStartAdornment?: React.ReactNode;
    titleEndAdornment?: React.ReactNode;
};

export const Page = ({
    title,
    subtitle,
    children,
    maxWidth = 'xl',
    containerSx,
    headerSx,
    contentSx,
    titleStartAdornment,
    titleEndAdornment
}: PageProps) => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const hasHeader = Boolean(title) || Boolean(subtitle);

    return (
        <Container
            maxWidth={maxWidth}
            sx={{
                my: isMobile ? 1 : 2,
                p: 0,
                ...containerSx
            }}
        >
            {hasHeader && (
                <Stack direction="column" spacing={1} sx={headerSx}>
                    {(titleStartAdornment || titleEndAdornment) ? (
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            {titleStartAdornment}
                            {title && (
                                typeof title === 'string' ? (
                                    <Typography variant="h6">{title}</Typography>
                                ) : (
                                    title
                                )
                            )}
                            <Box sx={{ flexGrow: 1 }} />
                            {titleEndAdornment}
                        </Stack>
                    ) : (
                        <>
                            {title && (
                                typeof title === 'string' ? (
                                    <Typography variant="h6">{title}</Typography>
                                ) : (
                                    title
                                )
                            )}
                        </>
                    )}
                    {subtitle && (
                        typeof subtitle === 'string' ? (
                            <Typography variant="body1" color="text.secondary">
                                {subtitle}
                            </Typography>
                        ) : (
                            subtitle
                        )
                    )}
                </Stack>
            )}
            <Stack sx={{ ...contentSx }}>{children}</Stack>
        </Container>
    );
};


