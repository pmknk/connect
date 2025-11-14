import { Stack, Typography, useTheme, Button } from '@mui/material';
import { ExtendedTheme } from '@content/admin-ui';
import { defineMessages, useIntl } from 'react-intl';
import { useSchemasQuery } from '../../hooks/useSchemasQuery';
import { useState, useMemo, MouseEvent } from 'react';
import {
    BookOpen,
    ChevronDown,
    FileText,
    History,
    Settings,
    Trash
} from 'lucide-react';

const intlMessages = defineMessages({
    catalog: {
        id: 'admin-content-library.sidebar.catalog',
        defaultMessage: 'Content Catalog'
    }
});

const catalogItems = [
    {
        label: 'Collections',
        icon: <BookOpen size={18} width={18} height={18} />,
        expandable: true
    },
    {
        label: 'Pages',
        icon: <FileText size={18} width={18} height={18} />,
        expandable: true
    },
    {
        label: 'History',
        icon: <History size={18} width={18} height={18} />
    },
    {
        label: 'Settings',
        icon: <Settings size={18} width={18} height={18} />,
        expandable: false
    },
    {
        label: 'Trash',
        icon: <Trash size={18} width={18} height={18} />
    }
];

export const ContentLibrarySidebar = () => {
    const { formatMessage } = useIntl();
    const { palette } = useTheme<ExtendedTheme>();
    const { data } = useSchemasQuery();
    const schemas = data?.data ?? [];
    const collections = useMemo(() => schemas.filter((s) => s.type === 'collection'), [schemas]);
    const pages = useMemo(() => schemas.filter((s) => s.type === 'page'), [schemas]);

    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        Collections: false,
        Pages: false
    });

    const handleToggle = (label: string) => (e: MouseEvent) => {
        e.preventDefault();
        if (!catalogItems.find((i) => i.label === label)?.expandable) return;
        setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
    };
    return (
        <Stack
            sx={{
                width: 270,
                maxWidth: 270,
                minWidth: 270,
                borderRight: `1px solid ${palette.divider}`,
                py: 3
            }}
        >
            <Typography variant="caption" color="text.secondary" px={3}>
                {formatMessage(intlMessages.catalog).toUpperCase()}
            </Typography>
            <Stack direction="column" spacing={1} mt={3} sx={{ px: 1 }}>
                {catalogItems.map((item) => (
                    <Stack key={item.label}>
                    <Button
                        variant="text"
                        fullWidth
                            onClick={handleToggle(item.label)}
                            aria-expanded={item.expandable ? !!expanded[item.label] : undefined}
                        sx={{
                            color: palette.gray[700],
                            textTransform: 'none',
                            justifyContent: 'flex-start',
                            px: 2
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            sx={{ width: '100%' }}
                        >
                            <Stack direction="row" spacing={2}>
                                {item.icon}
                                <Typography variant="body2">
                                    {item.label}
                                </Typography>
                            </Stack>
                            {item.expandable && (
                                    <ChevronDown
                                        size={18}
                                        width={18}
                                        height={18}
                                        style={{
                                            transition: 'transform 120ms ease',
                                            transform: expanded[item.label] ? 'rotate(0deg)' : 'rotate(-90deg)'
                                        }}
                                    />
                            )}
                        </Stack>
                    </Button>
                        {item.label === 'Collections' && expanded['Collections'] && collections.length > 0 && (
                            <Stack sx={{ pl: 6, pr: 2, py: 1 }} spacing={0.5}>
                                {collections.map((s) => (
                                    <Typography key={s.name} variant="caption" color="text.secondary">
                                        {s.name}
                                    </Typography>
                                ))}
                            </Stack>
                        )}
                        {item.label === 'Pages' && expanded['Pages'] && pages.length > 0 && (
                            <Stack sx={{ pl: 6, pr: 2, py: 1 }} spacing={0.5}>
                                {pages.map((s) => (
                                    <Typography key={s.name} variant="caption" color="text.secondary">
                                        {s.name}
                                    </Typography>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};
