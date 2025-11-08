import { Button, Link, Typography } from '@mui/material';
import { defineMessages, useIntl } from 'react-intl';
import { InviteQueryResponse } from '../../hooks/useInviteLazyQuery';

interface JoinFooterProps {
    isLoading: boolean;
    invite: InviteQueryResponse | null;
}

const intlMessages = defineMessages({
    button: {
        id: 'auth.admin.pages.join.button',
        defaultMessage: 'Next'
    },
    finish: {
        id: 'auth.admin.pages.join.finish',
        defaultMessage: 'Finish'
    },
    terms: {
        id: 'auth.admin.pages.join.terms',
        defaultMessage: 'By signing in, you consent to abide by our'
    },
    termsLink: {
        id: 'auth.admin.pages.join.termsLink',
        defaultMessage: 'Terms of Service'
    },
    privacyPolicyLink: {
        id: 'auth.admin.pages.join.privacyPolicyLink',
        defaultMessage: 'Privacy Policy'
    },
    privacyPolicy: {
        id: 'auth.admin.pages.join.privacyPolicy',
        defaultMessage: 'Privacy Policy'
    }
});

export const JoinFooter = ({ isLoading, invite }: JoinFooterProps) => {
    const { formatMessage } = useIntl();

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                disabled={isLoading}
            >
                {invite
                    ? formatMessage(intlMessages.finish)
                    : formatMessage(intlMessages.button)}
            </Button>

            <Typography
                component="p"
                variant="body2"
                color="text.secondary"
                textAlign="center"
                px={6}
            >
                {formatMessage(intlMessages.terms)}{' '}
                <Link href="#">{formatMessage(intlMessages.termsLink)}</Link> &{' '}
                <Link href="#">
                    {formatMessage(intlMessages.privacyPolicy)}
                </Link>
            </Typography>
        </>
    );
};
