import { Control, Controller } from "react-hook-form"
import { Input, InputProps, Typography } from "@material-tailwind/react"

type FormFieldProps = {
    name: string
    control: Control<any>
    label: string | React.ReactNode
    inputProps?: InputProps
}

export const FormField = ({ control, name, label, inputProps }: FormFieldProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => {
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
                            {...field} 
                            value={field.value || ''} 
                            {...inputProps} 
                        />
                    </div>
                )
            }}
        />
    )
}