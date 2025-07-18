import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { CardActions, Chip, Divider, Stack, useTheme } from "@mui/material";
import { defineMessages, useIntl } from "react-intl";

import type { ProjectsQueryResponse } from "../../../hooks/useProjectsQuery";
import { ExtendedTheme } from "@avyyx/admin-ui";

const intlMessages = defineMessages({
    contentItems: {
        id: 'projects.grid.contentItems',
        defaultMessage: '{count} content items'
    },
    contentItemsSingular: {
        id: 'projects.grid.contentItems.singular',
        defaultMessage: '{count} content item'
    },
    lastUpdated: {
        id: 'projects.grid.lastUpdated',
        defaultMessage: 'Last Updated'
    },
    active: {
        id: 'projects.grid.active',
        defaultMessage: 'Active'
    },
    inactive: {
        id: 'projects.grid.inactive',
        defaultMessage: 'Inactive'
    }
});

type ProjectCardProps = {
    project: ProjectsQueryResponse['data'][number];
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const { palette } = useTheme<ExtendedTheme>();
    const { formatDate, formatMessage } = useIntl();

    // TODO: Replace this with actual content items count from API
    const contentItemsCount = Math.floor(Math.random() * 100) + 1;

    return (
        <Card elevation={0} sx={{ 
            border: `1px solid ${palette.divider}`,
            borderRadius: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <CardContent sx={{
                '&.MuiCardContent-root': {
                    p: 2,
                    '&:last-child': {
                        paddingBottom: 2
                    }
                }
            }}>
                <Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar variant="rounded" sx={{ backgroundColor: palette.primary.main }}>
                                {project.name.charAt(0)}
                            </Avatar>
                            <Stack>
                                <Typography variant="h6" component="h2">
                                    {project.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatMessage(
                                        contentItemsCount === 1 
                                            ? intlMessages.contentItemsSingular 
                                            : intlMessages.contentItems,
                                        { count: contentItemsCount }
                                    )}
                                </Typography>
                            </Stack>
                        </Stack> 
                        {!project.deletedAt ? 
                            <Chip color="success" variant="outlined" label={formatMessage(intlMessages.active)} size="small"/> :
                            <Chip color="error" variant="outlined" label={formatMessage(intlMessages.inactive)} size="small"/>}
                    </Stack>
                    {project.description && (
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                                mt: 2,
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {project.description}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
            <CardActions sx={{
                p: 2,
                borderTop: `1px solid ${palette.divider}`,
            }}>
                <Stack spacing={0.2}>
                    <Typography variant="body2">
                        {formatMessage(intlMessages.lastUpdated)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {formatDate(project.updatedAt, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </Stack>
            </CardActions>
        </Card>
    );
}; 