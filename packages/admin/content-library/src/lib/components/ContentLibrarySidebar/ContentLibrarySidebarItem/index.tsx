import { Button, Stack, Typography, useTheme } from '@mui/material';
import { ExtendedTheme } from '@content/admin-ui';
import { ChevronDown } from 'lucide-react';
import { FC, MouseEvent, ReactNode } from 'react';

interface ContentLibrarySidebarItemProps {
    label: string;
    icon: ReactNode;
    expandable?: boolean;
    expanded?: boolean;
    onClick: (e: MouseEvent) => void;
}

export const ContentLibrarySidebarItem: FC<ContentLibrarySidebarItemProps> = ({
    label,
    icon,
    expandable = false,
    expanded = false,
    onClick
}) => {
    const { palette } = useTheme<ExtendedTheme>();

    return (
        <Button
            variant="text"
            fullWidth
            onClick={onClick}
            aria-expanded={expandable ? !!expanded : undefined}
            sx={{
                textTransform: 'none',
                justifyContent: 'flex-start',
                px: 2,
                color: palette.text.secondary,
                '&:hover': {
                    color: palette.primary.main,
                },
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                    width: '100%',
                }}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    {icon}
                    <Typography variant="body2">
                        {label}
                    </Typography>
                </Stack>
                {expandable && (
                    <ChevronDown
                        size={16}
                        width={16}
                        height={16}
                        style={{
                            transition: 'transform 120ms ease',
                            transform: expanded
                                ? 'rotate(0deg)'
                                : 'rotate(-90deg)'
                        }}
                    />
                )}
            </Stack>
        </Button>
    );
};


