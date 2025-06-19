import { useForm } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import { type JSONSchemaType } from "ajv";
import { defineMessages, useIntl } from "react-intl";
import { useMemo } from "react";

export interface LoginFormData {
    email: string;
    password: string;
}

const intlMessages = defineMessages({
    emailRequiredMessage: {
        id: "auth.admin.pages.login.emailRequiredMessage",
        defaultMessage: "Email is required"
    },
    passwordRequiredMessage: {
        id: "auth.admin.pages.login.passwordRequiredMessage",
        defaultMessage: "Password is required"
    }
})

export const useLoginForm = () => {
    const { formatMessage } = useIntl()

    const schema = useMemo((): JSONSchemaType<LoginFormData> => ({
        type: "object",
        properties: {
            email: { 
                type: "string",
                minLength: 1,
                errorMessage: {
                    minLength: formatMessage(intlMessages.emailRequiredMessage)
                }
             },
            password: { 
                type: "string",
                minLength: 1,
                errorMessage: {
                    minLength: formatMessage(intlMessages.passwordRequiredMessage)
                }
            }
        },
        required: ["email", "password"],
        additionalProperties: false,
    }), [formatMessage])

    return useForm<LoginFormData>({
        resolver: ajvResolver(schema, {
            allErrors: true,
            strict: false,
            $data: true
        })
    });
}