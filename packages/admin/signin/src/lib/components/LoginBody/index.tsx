import { FormField } from "@avyyx/admin-ui"
import { FormattedMessage } from "react-intl";
import { Control } from "react-hook-form";

interface LoginBodyProps {
    control: Control<any>;
}

export const LoginBody = ({ control }: LoginBodyProps) => {
    return (
        <>
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
                name="password"
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
        </>
    );
}; 