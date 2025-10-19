import { FormField } from "@connect/admin-ui";
import { defineMessages, useIntl } from "react-intl";
import { Control } from "react-hook-form";
import { JoinFormData } from "../../hooks/useJoinForm";
import { InviteQueryResponse } from "../../hooks/useInviteLazyQuery";
import { Alert, AlertTitle } from "@mui/material";
import { AlertCircle } from "lucide-react";


interface JoinBodyProps {
    control: Control<JoinFormData>;
    invite: InviteQueryResponse | null;
    isNotFoundError: boolean;
    isLoading: boolean;
}

const intlMessages = defineMessages({
    code: {
        id: 'auth.admin.pages.join.code',
        defaultMessage: 'Invitation Code'
    },
    email: {
        id: 'auth.admin.pages.join.email',
        defaultMessage: 'Email'
    },
    fullName: {
        id: 'auth.admin.pages.join.fullName',
        defaultMessage: 'Full Name'
    },
    password: {
        id: 'auth.admin.pages.join.password',
        defaultMessage: 'Password'
    },
    confirmPassword: {
        id: 'auth.admin.pages.join.confirmPassword',
        defaultMessage: 'Confirm Password'
    },
    inviteCodeNotFound: {
        id: 'auth.admin.pages.join.inviteCodeNotFound',
        defaultMessage: 'Invitation code not found'
    },
    inviteCodeNotFoundMessage: {
        id: 'auth.admin.pages.join.inviteCodeNotFoundMessage',
        defaultMessage: 'The invitation code you entered is incorrect. Please try again or contact the administrator.'
    },
    inviteCodeDescription: {
        id: 'auth.admin.pages.join.inviteCodeDescription',
        defaultMessage: 'Enter the invitation code you received to complete your account setup. If you do not have an invitation code, please contact the administrator.'
    },
    passwordDescription: {
        id: 'auth.admin.pages.join.passwordDescription',
        defaultMessage: 'Enter a password to complete your account setup. The password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, and one number.'
    },
});

export const JoinBody = ({ control, invite, isNotFoundError, isLoading }: JoinBodyProps) => {
    const { formatMessage } = useIntl();
    
    return  (
        <>
            {isNotFoundError && (
                <Alert color="error" icon={<AlertCircle size={20} />}>
                    <AlertTitle>
                        {formatMessage(intlMessages.inviteCodeNotFound)}
                    </AlertTitle>
                    {formatMessage(intlMessages.inviteCodeNotFoundMessage)}
                </Alert>
            )}
            {!invite && (
                <FormField
                    control={control}
                    name="code"
                    inputProps={{
                        label: formatMessage(intlMessages.code),
                        labelPlacement: 'outside',
                        placeholder: '123456',
                        helperText: formatMessage(intlMessages.inviteCodeDescription),
                        disabled: isLoading
                    }}
                />
            )}
            {!!invite && (
                <>
                    <FormField
                        control={control}
                        name="password"
                        inputProps={{
                            type: 'password',
                            label: formatMessage(intlMessages.password),
                            labelPlacement: 'outside',
                            placeholder: '••••••••',
                            helperText: formatMessage(intlMessages.passwordDescription),
                            disabled: isLoading
                        }}
                    />
                    <FormField
                        control={control}
                        name="confirmPassword"
                        inputProps={{
                            type: 'password',
                            label: formatMessage(intlMessages.confirmPassword),
                            labelPlacement: 'outside',
                            placeholder: '••••••••',
                            disabled: isLoading
                        }}
                    />
                </>
            )}
        </>
    )
};