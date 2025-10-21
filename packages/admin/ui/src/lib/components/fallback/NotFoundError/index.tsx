import { FileQuestion } from 'lucide-react';
import { ReactNode } from 'react';
import { Button, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import type { To } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { GenericPageErrorFallback } from '../GenericPageErrorFallback';

interface NotFoundErrorProps {
    actions?: ReactNode;
}

export const NotFoundError = ({ actions }: NotFoundErrorProps) => {
    const location = useLocation();
    const from = (location.state as { from?: unknown } | undefined)?.from;
    const backTo: To =
        typeof from === 'string'
            ? from
            : from && typeof from === 'object'
            ? (from as To)
            : '/';
    return (
        <GenericPageErrorFallback
            icon={<FileQuestion size={80} />}
            title={
                <FormattedMessage id="not-found" defaultMessage="Page Not Found" />
            }
            subtitle={
                <FormattedMessage
                    id="not-found-description"
                    defaultMessage="The content you are looking for doesn’t exist or has been moved."
                />
            }
            actions={
                actions ?? (
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" color="primary" component={Link} to="/">
                            <FormattedMessage id="go-home" defaultMessage="Go Home" />
                        </Button>
                        <Button variant="outlined" color="primary" component={Link} to={backTo}>
                            <FormattedMessage id="go-back" defaultMessage="Go Back" />
                        </Button>
                    </Stack>
                )
            }
        />
    );
};


