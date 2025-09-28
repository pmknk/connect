import { useState } from "react";
import {defineMessages, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { FormWrapper } from "../../components/FormWrapper";
import { JoinBody } from "../../components/JoinBody";
import { JoinFooter } from "../../components/JoinFooter";

import { JoinFormData, useJoinForm } from "../../hooks/useJoinForm";
import { type InviteQueryResponse, useInviteLazyQuery } from "../../hooks/useInviteLazyQuery";
import { useJoinMutation } from "../../hooks/useJoinMutation";

const intlMessages = defineMessages({
    title: {
        id: 'auth.admin.pages.join.title',
        defaultMessage: 'Hello there!'
    },
    subtitle: {
        id: 'auth.admin.pages.join.subtitle',
        defaultMessage: 'Fill in the form to complete your account setup'
    }
});

export const Join = () => {
    const navigate = useNavigate();
    const [invite, setInvite] = useState<InviteQueryResponse | null>(null);
    const { control, handleSubmit } = useJoinForm(!!invite);
    const { fetchInvite, isLoading, isNotFoundError } = useInviteLazyQuery();
    const { mutate, isPending } = useJoinMutation(() => {
        navigate('/signin', {
            state: {
                signin: true
            }
        });
    });
    const { formatMessage } = useIntl();

    const onSubmit = async (data: JoinFormData) => {
        if (!invite) {
            const response = await fetchInvite(data.code || '');
            if (response) {
                setInvite(response);
            }
            return;
        }

        mutate(data);
    };

    return (
        <FormWrapper
            onSubmit={handleSubmit(onSubmit)}
            title={formatMessage(intlMessages.title)}
            subtitle={formatMessage(intlMessages.subtitle)}
            body={<JoinBody control={control} invite={invite} isNotFoundError={isNotFoundError} isLoading={isLoading || isPending} />}
            footer={<JoinFooter isLoading={isLoading || isPending} invite={invite} />}
        />
    );
};

export default () => {
    return <Join />;
};