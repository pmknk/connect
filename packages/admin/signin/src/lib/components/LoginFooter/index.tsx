import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface LoginFooterProps {
    isLoading: boolean;
}

export const LoginFooter = ({ isLoading }: LoginFooterProps) => {
    return (
        <>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                loading={isLoading}
                type="submit"
                size="large"
            >
                <FormattedMessage
                    id="auth.admin.pages.login.submit"
                    defaultMessage="Sign in"
                />
            </Button>
            <Typography
                component="p"
                variant="body2"
                color="text.secondary"
                textAlign="center"
                px={6}
            >
                <FormattedMessage
                    id="auth.admin.pages.login.join.text"
                    defaultMessage="Don't have an account?"
                />{' '}
                <Link href="/signin/join">
                    <FormattedMessage
                        id="auth.admin.pages.login.join.link"
                        defaultMessage="Join now"
                    />
                </Link>
            </Typography>
        </>
    );
};
