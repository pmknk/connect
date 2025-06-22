import { Spinner } from "@material-tailwind/react";

type FullPageLoaderProps = {
    showLogo?: boolean;
    showSpinner?: boolean;
    loadingText?: string | React.ReactNode;
};

/**
 * Full page loader component
 * @returns {React.ReactNode} Full page loader component
 */
export const FullPageLoader = ({
    showLogo,
    showSpinner,
    loadingText
}: FullPageLoaderProps) => {
    return (
        <div
            className={
                'h-full w-full flex flex-col justify-center items-center'
            }
        >
            {showSpinner && <Spinner></Spinner>}
            {showLogo && (
                <div className="text-lg flex items-center gap-2 text-default-600">
                    <h1 className="text-2xl font-extralight">Avyyx Studio</h1>
                </div>
            )}
            {loadingText && (
                <p className="mt-4 text-default-400 font-light">
                    {loadingText}
                </p>
            )}
        </div>
    );
};
