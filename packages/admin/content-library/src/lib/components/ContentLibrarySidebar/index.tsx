import { Stack, Typography, useTheme } from '@mui/material';
import { ExtendedTheme } from '@content/admin-ui';
import { defineMessages, useIntl } from 'react-intl';
import { useSchemasQuery } from '../../hooks/useSchemasQuery';
import { useState, useMemo, MouseEvent } from 'react';
import {
    BookOpen,
    FileText,
    History,
    Settings,
    Trash
} from 'lucide-react';
import { ContentLibrarySidebarExpandableList } from './ContentLibrarySidebarExpandableList';
import { ContentLibrarySidebarItem } from './ContentLibrarySidebarItem';

const intlMessages = defineMessages({
    catalog: {
        id: 'admin-content-library.sidebar.catalog',
        defaultMessage: 'Content Catalog'
    }
});

const catalogItems = [
    {
        label: 'Collections',
        icon: <BookOpen size={16} width={16} height={16} />,
        expandable: true
    },
    {
        label: 'Pages',
        icon: <FileText size={16} width={16} height={16} />,
        expandable: true
    },
    {
        label: 'History',
        icon: <History size={16} width={16} height={16} />
    },
    {
        label: 'Settings',
        icon: <Settings size={16} width={16} height={16} />,
        expandable: false
    },
    {
        label: 'Trash',
        icon: <Trash size={16} width={16} height={16} />
    }
];

export const ContentLibrarySidebar = () => {
    const { formatMessage } = useIntl();
    const { palette } = useTheme<ExtendedTheme>();
    const { data } = useSchemasQuery();
    const schemas = data?.data ?? [];
    const collections = useMemo(
        () => schemas.filter((s) => s.type === 'collection'),
        [schemas]
    );
    const pages = useMemo(
        () => schemas.filter((s) => s.type === 'page'),
        [schemas]
    );

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
                        <ContentLibrarySidebarItem
                            label={item.label}
                            icon={item.icon}
                            expandable={!!item.expandable}
                            expanded={!!expanded[item.label]}
                            onClick={handleToggle(item.label)}
                        />
                        {item.label === 'Collections' && (
                            <ContentLibrarySidebarExpandableList
                                items={collections}
                                isExpanded={!!expanded['Collections']}
                                variant="body2"
                            />
                        )}
                        {item.label === 'Pages' && (
                            <ContentLibrarySidebarExpandableList
                                items={pages}
                                isExpanded={!!expanded['Pages']}
                                variant="caption"
                            />
                        )}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};
