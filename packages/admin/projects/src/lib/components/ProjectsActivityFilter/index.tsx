import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const intlMessages = defineMessages({
    filterByActivity: {
        id: 'projects.activity.filter.filterByActivity',
        defaultMessage: 'Filters'
    },
    all: {
        id: 'projects.activity.filter.all',
        defaultMessage: 'All projects'
    },
    active: {
        id: 'projects.activity.filter.active',
        defaultMessage: 'Active'
    },
    inactive: {
        id: 'projects.activity.filter.inactive',
        defaultMessage: 'Inactive'
    }
});

type ProjectsActivityFilterProps = {
    value: ProjectsActivityFilterValue;
    onFilterChange: (filter: ProjectsActivityFilterValue) => void;
};

export type ProjectsActivityFilterValue = 'all' | 'active' | 'inactive';

export const ProjectsActivityFilter = ({
    value,
    onFilterChange
}: ProjectsActivityFilterProps) => {
    const { formatMessage } = useIntl();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const filterOptions = [
        {
            label: formatMessage(intlMessages.active),
            value: 'active'
        },
        {
            label: formatMessage(intlMessages.inactive),
            value: 'inactive'
        }
    ];

    const showFilter = value !== 'all';

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleFilterChange = (filter: ProjectsActivityFilterValue) => {
        onFilterChange(filter);
        handleClose();
    };

    const onDeleteFilter = () => {
        onFilterChange('all');
        handleClose();
    };

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                    width: '100%',
                    minWidth: '100px'
                }}
                startIcon={<ListFilter size={16} />}
                onClick={handleClick}
            >
                {formatMessage(intlMessages.filterByActivity)}
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                {filterOptions.map((option) => (
                    <MenuItem
                        key={option.value}
                        onClick={() =>
                            handleFilterChange(
                                option.value as ProjectsActivityFilterValue
                            )
                        }
                        sx={{
                            minWidth: '100px'
                        }}
                        selected={value === option.value}
                    >
                        <Typography variant="body2">{option.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
            {showFilter && (
                <Chip
                    label={formatMessage(intlMessages[value])}
                    onDelete={onDeleteFilter}
                />
            )}
        </Stack>
    );
};
