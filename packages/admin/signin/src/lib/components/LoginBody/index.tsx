import { FormField } from '@avyyx/admin-ui';
import { Alert, AlertTitle } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Control } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';


interface LoginBodyProps {
    control: Control<any>;
    isLoading: boolean;
    isUnauthorized: boolean;
}

export const LoginBody = ({
    control,
    isLoading,
    isUnauthorized
}: LoginBodyProps) => {
    return (
        <>
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
