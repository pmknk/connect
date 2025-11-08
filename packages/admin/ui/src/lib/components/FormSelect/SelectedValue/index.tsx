import Typography from '@mui/material/Typography';

type SelectedValueMessages = {
    placeholder: string;
    single: (count: number) => string;
    plural: (count: number) => string;
};

type SelectedValueProps = {
    value: any;
    messages: SelectedValueMessages;
};

export const SelectedValue: React.FC<SelectedValueProps> = ({
    value,
    messages
}) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
        return (
            <Typography
                color={'text.primary'}
                sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    opacity: 0.4
                }}
            >
                {messages.placeholder}
            </Typography>
        );
    }

    if (Array.isArray(value)) {
        const count = value.length;

        if (count === 0) {
            return null;
        } else if (count === 1) {
            return <>{messages.single(1)}</>;
        } else {
            return <>{messages.plural(count)}</>;
        }
    }

    return null;
};
