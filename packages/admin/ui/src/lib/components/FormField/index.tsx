import { Control, Controller, useFormState } from "react-hook-form"
import { Input, InputProps, Typography } from "@material-tailwind/react"

/**
 * Props for the FormField component
 */
type FormFieldProps = {
    /** The field name used for form registration and validation */
    name: string
    /** React Hook Form control object for managing form state */
    control: Control<any>
    /** Label text or element to display above the input field */
    label: string | React.ReactNode
    /** Optional props to pass to the underlying Input component */
    inputProps?: InputProps
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
export const FormField = ({ control, name, label, inputProps }: FormFieldProps) => {
    const { errors } = useFormState({ control })
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => {
                const error = errors[name]
                return (
                    <div className="space-y-1">
                        <Typography
                            as="label"
                            htmlFor={name}
                            type="small"
                            color="default"
                            className="font-semibold"
                        >
                            {label}
                        </Typography>
                        <Input
                            id={name} 
                            {...inputProps}
                            {...field} 
                            isError={!!error}
                            color={error ? "error" : (inputProps?.color || "primary")}
                        />
                        {error && (
                            <Typography type="small" color="error" className="mt-1 block">
                                {error.message}
                            </Typography>
                        )}
                    </div>
                )
            }}
        />
    )
}