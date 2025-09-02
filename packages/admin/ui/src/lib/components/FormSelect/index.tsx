import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select, { type SelectProps } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import { useTheme } from '@mui/material/styles';
import { Control, Controller, useFormState } from 'react-hook-form';
import { useEffect, useRef } from 'react';

/**
 * Props for the FormSelect component
 */
type FormSelectProps = {
    /** The field name used for form registration and validation */
    name: string;
    /** React Hook Form control object for managing form state */
    control: Control<any>;
    /** Options to display in the select dropdown */
    /** Optional props to pass to the underlying Select component */
    selectProps?: SelectProps & {
        labelPlacement?: 'outside';
        helperText?: React.ReactNode | string;
        onScrollEnd?: () => void;
    };
    children?: SelectProps['children'];
    /** Callback function triggered when menu is scrolled to the bottom */
};

/**
 * A form field component that integrates with React Hook Form
 *
 * This component provides a complete form field with label, input, and error handling.
 * It uses React Hook Form's Controller for form state management and displays
 * validation errors when they occur.
 *
 * @param props - The component props
 * @param props.control - React Hook Form control object for managing form state
 * @param props.name - The field name used for form registration and validation
 * @param props.options - Options to display in the select dropdown
 * @param props.selectProps - Optional props to pass to the underlying Select component
 * @param props.renderOption - Optional component to render each option
 * @param props.onMenuScrollToBottom - Optional callback triggered when menu is scrolled to bottom
 * @returns A form field with label, select, and error display
 */
export const FormSelect = ({
    control,
    name,
    selectProps,
    children
}: FormSelectProps) => {
    const { errors } = useFormState({ control });
    const theme = useTheme();
    const isAtBottomRef = useRef(false);

    const handleMenuScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = target;

        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

        if (isAtBottom && !isAtBottomRef.current) {
            isAtBottomRef.current = true;
            selectProps?.onScrollEnd?.();
        } else if (!isAtBottom) {
            isAtBottomRef.current = false;
        }
    };

    useEffect(() => {
        if (!selectProps?.onScrollEnd) return;

        const handleMenuOpen = () => {
            isAtBottomRef.current = false;

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const element = node as Element;
                            const menuElement =
                                element.querySelector('[role="listbox"]') ||
                                (element.getAttribute('role') === 'listbox'
                                    ? element
                                    : null);

                            if (menuElement) {
                                observer.disconnect();

                                menuElement.addEventListener(
                                    'scroll',
                                    (event) => {
                                        const target =
                                            event.target as HTMLElement;
                                        const {
                                            scrollTop,
                                            scrollHeight,
                                            clientHeight
                                        } = target;

                                        const isAtBottom =
                                            scrollTop + clientHeight >=
                                            scrollHeight - 5;

                                        if (
                                            isAtBottom &&
                                            !isAtBottomRef.current
                                        ) {

                                            isAtBottomRef.current = true;
                                            selectProps?.onScrollEnd?.();
                                        } else if (!isAtBottom) {
                                            isAtBottomRef.current = false;
                                        }
                                    }
                                );
                            }
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        };

        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (
                target.closest('[role="button"]') &&
                target.closest('[aria-haspopup="listbox"]')
            ) {
                handleMenuOpen();
            }
        });

        return () => {
            document.removeEventListener('click', handleMenuOpen);
        };
    }, [selectProps?.onScrollEnd]);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => {
                const error = errors[name];
                return (
                    <Stack
                        spacing={0.5}
                        sx={{
                            opacity: selectProps?.disabled ? 0.5 : 1
                        }}
                    >
                        {selectProps?.labelPlacement === 'outside' && (
                            <Typography
                                component="label"
                                htmlFor={name}
                                sx={{
                                    fontSize: '0.875rem',
                                    lineHeight: '1rem',
                                    marginLeft: '0.25rem !important',
                                    color: error
                                        ? theme.palette.error.main
                                        : theme.palette.text.primary
                                }}
                            >
                                {selectProps?.label}
                            </Typography>
                        )}
                        <Select
                            {...selectProps}
                            {...field}
                            value={field.value || ''}
                            error={!!error}
                            label={
                                selectProps?.labelPlacement === 'outside'
                                    ? undefined
                                    : selectProps?.label
                            }
                            MenuProps={{
                                ...selectProps?.MenuProps,
                                sx: {
                                    mt: 1
                                },
                                PaperProps: {
                                    ...selectProps?.MenuProps?.PaperProps,
                                    onScroll: selectProps?.onScrollEnd
                                        ? handleMenuScroll
                                        : selectProps?.MenuProps?.PaperProps
                                              ?.onScroll
                                }
                            }}
                        >
                            {children}
                        </Select>
                        {error && (
                            <FormHelperText error>
                                {error.message as string}
                            </FormHelperText>
                        )}
                        {selectProps?.helperText && !error && (
                            <FormHelperText>
                                {selectProps.helperText}
                            </FormHelperText>
                        )}
                    </Stack>
                );
            }}
        />
    );
};
