import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type FormWrapperProps = {
    title: string | React.ReactNode;
    subtitle: string | React.ReactNode;
    body: React.ReactNode;
    footer: React.ReactNode;
    onSubmit: (data: any) => void;
};

export const FormWrapper = ({
    title,
    subtitle,
    body,
    footer,
    onSubmit
}: FormWrapperProps) => {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="100%"
            overflow="auto"
        >
            <form
                onSubmit={onSubmit}
                style={{ width: '100%', maxWidth: '390px' }}
            >
                <Stack spacing={4} width="100%">
                    <Stack spacing={1} textAlign="center">
                        <Typography variant="h5">{title}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {subtitle}
                        </Typography>
                    </Stack>
                    <Stack spacing={4}>{body}</Stack>
                    <Stack spacing={3}>{footer}</Stack>
                </Stack>
            </form>
        </Stack>
    );
};
