import { Control, Controller, useFormState } from "react-hook-form"
import { Input, InputProps, Typography } from "@material-tailwind/react"

type FormFieldProps = {
    name: string
    control: Control<any>
    label: string | React.ReactNode
    inputProps?: InputProps
}

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