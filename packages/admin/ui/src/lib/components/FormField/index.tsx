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
            render={({ field }) => (
                <div className="space-y-1">
                    <Typography
                        as="label"
                        htmlFor="email"
                        type="small"
                        color="default"
                        className="font-semibold"
                    >
                        {label}
                    </Typography>
                    <Input id={name} {...inputProps} />
              </div>
            )}
        />
    )
}