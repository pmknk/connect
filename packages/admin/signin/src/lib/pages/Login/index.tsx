import { FormField } from "@avyyx/admin-ui"

import { FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form"
import { Layout } from "../../components/Layout"
import { Button, Typography } from "@material-tailwind/react";

export const Login = () => {
    const { control, handleSubmit } = useForm()
    return (
        <Layout
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
            body={<>
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
                        type: "email",
                        placeholder: "john@example.com",
                        size: "lg",
                    }}
                />
                <FormField
                    control={control}
                    name="email"
                    label={
                        <FormattedMessage 
                            id="auth.admin.pages.login.password" 
                            defaultMessage="Password" 
                        />
                    }
                    inputProps={{
                        type: "password",
                        placeholder: "••••••••••••",
                        size: "lg",
                    }}
                />
            </>}
            footer={
                <>
                    <Button type="submit" isFullWidth size="lg" className="mb-4">
                        <FormattedMessage id="auth.admin.pages.login.submit" defaultMessage="Sign in" />
                    </Button>
                    <Typography
                        as="p"
                        type="small"
                        className="text-center block mx-auto max-w-xs text-foreground"
                    >
                        <FormattedMessage 
                            id="auth.admin.pages.login.terms" 
                            defaultMessage="By signing in, you consent to abide by our" 
                        />{" "}
                        <a href="#" className="text-orange-500 dark:text-white">
                            <FormattedMessage 
                                id="auth.admin.pages.login.terms.link" 
                                defaultMessage="Terms of Service" 
                            />
                        </a>{" "}
                        &{" "}
                        <a href="#" className="text-orange-500 dark:text-white">
                            <FormattedMessage 
                                id="auth.admin.pages.login.terms.link" 
                                defaultMessage="Privacy Policy" 
                            />
                        </a>
                        </Typography>
                </>

            }
        />
    )
}

export default Login;