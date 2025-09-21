import { FormattedMessage } from "react-intl";
import { FormWrapper } from "../../components/FormWrapper";

export const Join = () => {
    return (
        <FormWrapper
            onSubmit={() => {}}
            title={
                <FormattedMessage
                    id="auth.admin.pages.join.title"
                    defaultMessage="Hello there!"
                />
            }
            subtitle={
                <FormattedMessage
                    id="auth.admin.pages.join.subtitle"
                    defaultMessage="Fill in the form to complete your account"
                />
            }
            body={<div>Join</div>}
            footer={<div>Join</div>}
        />
    );
};

export default () => {
    return <Join />;
};