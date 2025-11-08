import { Stack, Typography, useTheme, Button } from '@mui/material';
import { ExtendedTheme } from '@content/admin-ui';
import { defineMessages, useIntl } from 'react-intl';
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
        id: 'content-library.sidebar.catalog',
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
                    <Button
                        key={item.label}
                        variant="text"
                        fullWidth
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
                                <ChevronDown size={18} width={18} height={18} />
                            )}
                        </Stack>
                    </Button>
                ))}
            </Stack>
        </Stack>
    );
};
