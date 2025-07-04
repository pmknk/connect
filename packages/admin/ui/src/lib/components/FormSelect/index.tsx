import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { useTheme } from "@mui/material/styles"
import { Control, Controller, useFormState } from "react-hook-form"
import Select, { type SelectProps } from "@mui/material/Select"
import FormHelperText from "@mui/material/FormHelperText"

/**
 * Props for the FormSelect component
 */
type FormSelectProps = {
    /** The field name used for form registration and validation */
    name: string
    /** React Hook Form control object for managing form state */
    control: Control<any>
    /** Options to display in the select dropdown */
    /** Optional props to pass to the underlying Select component */
    selectProps?: SelectProps & {
        labelPlacement?: 'outside'
        helperText?: React.ReactNode | string
    }
    children?: SelectProps['children']
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
 * @param props.options - Options to display in the select dropdown
 * @param props.selectProps - Optional props to pass to the underlying Select component
 * @param props.renderOption - Optional component to render each option
 * @returns A form field with label, select, and error display
 */
export const FormSelect = ({ control, name, selectProps, children }: FormSelectProps) => {
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
                        opacity: selectProps?.disabled ? 0.5 : 1,
                    }}>
                        {selectProps?.labelPlacement === 'outside' && (
                            <Typography component="label" htmlFor={name} sx={{
                                fontSize: '0.875rem',
                                lineHeight: '1rem',
                                marginLeft: '0.25rem !important',
                                color: error ? theme.palette.error.main : theme.palette.text.primary,
                            }}>
                                {selectProps?.label}
                            </Typography>
                        )}
                        <Select
                            {...selectProps}
                            {...field}
                            value={field.value || ''}
                            error={!!error}
                            label={selectProps?.labelPlacement === 'outside' ? undefined : selectProps?.label}
                        >
                            {children}
                        </Select>
                        {error && (
                            <FormHelperText error>
                                {error.message as string}
                            </FormHelperText>
                        )}
                        {selectProps?.helperText && (
                            <FormHelperText>
                                {selectProps.helperText}
                            </FormHelperText>
                        )}
                    </Stack>
                )
            }}
        />
    )
}