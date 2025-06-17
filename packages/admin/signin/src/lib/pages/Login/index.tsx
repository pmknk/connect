import { FormattedMessage } from "react-intl";
import { FormWrapper } from "../../components/FormWrapper"
import { useLoginForm } from "../../hooks/useLoginForm"
import { LoginBody } from "../../components/LoginBody"
import { LoginFooter } from "../../components/LoginFooter"

export const Login = () => {
    const { control, handleSubmit } = useLoginForm()

    return (
        <FormWrapper
            onSubmit={handleSubmit((data) => {
                console.log("submit", data)
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
            body={<LoginBody control={control} />}
            footer={<LoginFooter />}
        />
    )
}

export default Login;