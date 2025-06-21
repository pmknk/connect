import { ListItem, Typography } from "@material-tailwind/react"
import { ReactNode } from "react"

type MainMenuItemProps = {
    key: string
    href: string
    label: string | ReactNode
    selected?: boolean
}

export const MainMenuItem = ({ key, href, label, selected }: MainMenuItemProps) => {
    return (
        <ListItem 
            as='a'
            key={key} 
            href={href}
            ripple={false}
            className={`text-gray-100 hover:text-white hover:bg-gray-100/15 rounded-sm active:bg-gray-100/15 ${selected ? 'bg-gray-100/15' : 'bg-transparent'}`}
        >
            <Typography type='small'>
                {label}
            </Typography>
        </ListItem>
    )
}