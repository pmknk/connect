import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { FormWrapper } from '../../components/FormWrapper';

import { LoginBody } from '../../components/LoginBody';
import { LoginFooter } from '../../components/LoginFooter';

import { LoginFormData, useLoginForm } from '../../hooks/useLoginForm';
import { useLoginMutation } from '../../hooks/useLoginMutation';

export const Login = () => {
    const { control, handleSubmit } = useLoginForm();
    const { mutate, isPending, isUnauthorized } = useLoginMutation();
    const location = useLocation();

    return (
        <FormWrapper
            onSubmit={handleSubmit((formData: LoginFormData) => {
                mutate(formData);
            })}
            title={
                <FormattedMessage
                    id="auth.admin.pages.login.title"
                    defaultMessage="Hello there!"
                />
            }
            subtitle={
                <FormattedMessage
                    id="admin.auth.pages.login.subtitle"
                    defaultMessage="Please sign in to your account to continue to the admin panel"
                />
            }
            body={
                <LoginBody
                    control={control}
                    isLoading={isPending}
                    isUnauthorized={isUnauthorized}
                    isSigninSuccess={location.state?.signin}
                />
            }
            footer={<LoginFooter isLoading={isPending} />}
        />
    );
};

export default () => {
    return <Login />;
};
