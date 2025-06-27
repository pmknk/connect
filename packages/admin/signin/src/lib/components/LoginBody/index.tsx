import { FormField } from '@avyyx/admin-ui';
import { Alert } from '@material-tailwind/react';
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
                <Alert color="error">
                    <Alert.Icon className="mt-1">
                        <AlertCircle size={20} />
                    </Alert.Icon>
                    <Alert.Content className="leading-normal">
                        <FormattedMessage
                            id="auth.admin.pages.login.unauthorized"
                            defaultMessage="The email address or password you entered is incorrect. Please double-check your credentials and try again."
                        />
                    </Alert.Content>
                </Alert>
            )}
            <FormField
                control={control}
                name="email"
                label={
                    <FormattedMessage
                        id="auth.admin.pages.login.email"
                        defaultMessage="Email"
                    />
                }
                inputProps={{
                    type: 'email',
                    placeholder: 'john@doe.com',
                    size: 'lg',
                    disabled: isLoading
                }}
            />
            <FormField
                control={control}
                name="password"
                label={
                    <FormattedMessage
                        id="auth.admin.pages.login.password"
                        defaultMessage="Password"
                    />
                }
                inputProps={{
                    type: 'password',
                    placeholder: '••••••••••••',
                    size: 'lg',
                    disabled: isLoading
                }}
            />
        </>
    );
};
