import { Page } from '@content/admin-ui';
import { ContentLibrarySidebar } from '../../components/ContentLibrarySidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useSchemasQuery } from '../../hooks/useSchemasQuery';

const ContentLibrary = () => {
    const { data, isLoading, error } = useSchemasQuery();

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <ContentLibrarySidebar />
            <Page title="Content Library" maxWidth={false}>
                {isLoading ? (
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <CircularProgress size={20} />
                        <Typography variant="body2">
                            Loading schemas…
                        </Typography>
                    </Box>
                ) : error ? (
                    <Typography color="error" sx={{ p: 2 }}>
                        Failed to load schemas
                    </Typography>
                ) : (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Schemas ({data?.data.length ?? 0})
                        </Typography>
                        <List dense>
                            {data?.data.map((schema) => (
                                <ListItem key={schema.name}>
                                    {schema.name}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Page>
        </Box>
    );
};

export default ContentLibrary;
