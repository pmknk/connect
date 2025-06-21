import { ErrorBoundary } from '@avyyx/admin-utils';
import { FormattedMessage } from 'react-intl';
import { FormWrapper } from '../../components/FormWrapper';
import { LoginFormData, useLoginForm } from '../../hooks/useLoginForm';
import { LoginBody } from '../../components/LoginBody';
import { LoginFooter } from '../../components/LoginFooter';
import { useLoginMutation } from '../../hooks/useLoginMutation';

export const Login = () => {
    const { control, handleSubmit } = useLoginForm();
    const { mutate, isPending, isUnauthorized } = useLoginMutation();

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
                />
            }
            footer={<LoginFooter isLoading={isPending} />}
        />
    );
};

export default () => {
    return (
        <ErrorBoundary fallback={() => <div>Error</div>}>
            <Login />
        </ErrorBoundary>
    );
};
