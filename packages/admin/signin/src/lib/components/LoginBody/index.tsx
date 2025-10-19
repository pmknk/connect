import { FormField } from '@connect/admin-ui';
import { Alert, AlertTitle } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Control } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { LoginFormData } from '../../hooks/useLoginForm';


interface LoginBodyProps {
    control: Control<LoginFormData>;
    isLoading: boolean;
    isUnauthorized: boolean;
    isSigninSuccess: boolean;
}

export const LoginBody = ({
    control,
    isLoading,
    isUnauthorized,
    isSigninSuccess
}: LoginBodyProps) => {
    return (
        <>
            {isSigninSuccess && !isLoading && (
                <Alert color="success" icon={<AlertCircle size={20} />}>
                    <AlertTitle>
                        <FormattedMessage
                            id="auth.admin.pages.login.signinSuccess"
                            defaultMessage="Account created successfully"
                        />
                    </AlertTitle>
                    <FormattedMessage
                        id="auth.admin.pages.login.signinSuccess"
                        defaultMessage="You can now sign in to your account. Please enter your email and password to continue."
                    />
                </Alert>
            )}
            {isUnauthorized && !isLoading && (
                <Alert color="error" icon={<AlertCircle size={20} />}>
                    <AlertTitle>
                        <FormattedMessage
                            id="auth.admin.pages.login.unauthorized"
                            defaultMessage="Authorization failed"
                        />
                    </AlertTitle>
                    <FormattedMessage
                        id="auth.admin.pages.login.unauthorized"
                        defaultMessage="The email address or password you entered is incorrect. Please double-check your credentials and try again."
                    />
                </Alert>
            )}
            <FormField
                control={control}
                name="email"
                inputProps={{
                    labelPlacement: 'outside',
                    label: (
                        <FormattedMessage
                            id="auth.admin.pages.login.email"
                            defaultMessage="Email"
                        />
                    ),
                    type: 'email',
                    placeholder: 'john@doe.com',
                    disabled: isLoading
                }}
            />
            <FormField
                control={control}
                name="password"
                inputProps={{
                    type: 'password',
                    placeholder: '••••••••••••',
                    disabled: isLoading,
                    labelPlacement: 'outside',
                    label: (
                        <FormattedMessage
                            id="auth.admin.pages.login.password"
                            defaultMessage="Password"
                        />
                    ),
                }}
            />
        </>
    );
};
