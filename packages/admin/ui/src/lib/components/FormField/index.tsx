import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField, { type TextFieldProps } from "@mui/material/TextField"

import { useTheme } from "@mui/material/styles"
import { Control, Controller, useFormState } from "react-hook-form"

/**
 * Props for the FormField component
 */
type FormFieldProps = {
    /** The field name used for form registration and validation */
    name: string
    /** React Hook Form control object for managing form state */
    control: Control<any>
    /** Label text or element to display above the input field */
    /** Optional props to pass to the underlying Input component */
    inputProps?: TextFieldProps & {
        labelPlacement?: 'outside'
    }
}

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
 * @param props.label - Label text or element to display above the input field
 * @param props.inputProps - Optional props to pass to the underlying Input component
 * @returns A form field with label, input, and error display
 */
export const FormField = ({ control, name, inputProps }: FormFieldProps) => {
    const { errors } = useFormState({ control })
    const theme = useTheme()
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => {
                const error = errors[name]
                return (
                    <Stack spacing={1} sx={{
                        opacity: inputProps?.disabled ? 0.5 : 1,
                    }}>
                        {inputProps?.labelPlacement === 'outside' && (
                            <Typography component="label" htmlFor={name} sx={{
                                fontSize: '0.875rem',
                                lineHeight: '1rem',
                                marginLeft: '0.25rem',
                                color: error ? theme.palette.error.main : theme.palette.text.primary,
                            }}>
                                {inputProps?.label}
                            </Typography>
                        )}
                        <TextField
                            error={!!error}
                            {...inputProps}
                            {...field}
                            label={inputProps?.labelPlacement === 'outside' ? undefined : inputProps?.label}
                            helperText={error ? error.message as string : inputProps?.helperText as string}
                        />
                    </Stack>
                )
            }}
        />
    )
}