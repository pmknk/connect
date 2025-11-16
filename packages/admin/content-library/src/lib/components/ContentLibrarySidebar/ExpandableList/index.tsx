import { Stack, Typography, useTheme } from '@mui/material';
import { ExtendedTheme } from '@content/admin-ui';
import { FC } from 'react';

type NamedItem = { name: string };

interface SidebarExpandableListProps {
    items: NamedItem[];
    isExpanded: boolean;
    variant?: 'body2' | 'caption';
}

export const SidebarExpandableList: FC<SidebarExpandableListProps> = ({
    items,
    isExpanded,
    variant = 'body2',
}) => {
    const { palette } = useTheme<ExtendedTheme>();
    if (!items.length) return null;

    return (
        <Stack
            sx={{
                display: 'grid',
                gridTemplateRows: isExpanded ? '1fr' : '0fr',
                transition: 'grid-template-rows 180ms ease',
                pl: 3,
                pr: 2,
                mt: isExpanded ? 1 : 0,
                overflow: 'hidden',
                ml: 2.8,
                borderLeft: `1px solid ${palette.divider}`,
                borderLeftStyle: 'dashed',
            }}
            aria-hidden={!isExpanded}
        >
            <Stack
                sx={{
                    overflow: 'hidden',
                    py: isExpanded ? 1 : 0,
                    opacity: isExpanded ? 1 : 0,
                    transition: 'opacity 160ms ease, padding 160ms ease'
                }}
                gap={2}
            >
                {items.map((s) => (
                    <Typography
                        key={s.name}
                        variant={variant}
                        color="text.secondary"
                        sx={{
                            cursor: 'pointer',
                            transition: 'color 160ms ease, transform 160ms ease',
                            willChange: 'transform',
                            '&:hover': {
                                color: palette.primary.main,
                            },
                        }}
                    >
                        {s.name}
                    </Typography>
                ))}
            </Stack>
        </Stack>
    );
};


