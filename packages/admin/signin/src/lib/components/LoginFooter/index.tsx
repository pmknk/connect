import { Button, Spinner, Typography } from "@material-tailwind/react";
import { FormattedMessage } from "react-intl";

interface LoginFooterProps {
    isLoading: boolean;
}

export const LoginFooter = ({ isLoading }: LoginFooterProps) => {
    return (
        <>
            <Button type="submit" isFullWidth size="lg" className="mb-4" disabled={isLoading}>
                {isLoading && <Spinner size="sm" className="mr-2" />}
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
    );
}; 