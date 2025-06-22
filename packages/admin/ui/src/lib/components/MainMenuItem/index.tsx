import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ListItem, Typography } from "@material-tailwind/react"

type MainMenuItemProps = {
    key: string
    href: string
    label: string | ReactNode
    selected?: boolean
}

export const MainMenuItem = ({ key, href, label, selected }: MainMenuItemProps) => {
    return (
        <Link to={href} key={key}>
            <ListItem 
                className={`text-gray-100 hover:text-white hover:bg-gray-100/15 rounded-sm active:bg-gray-100/15 ${selected ? 'bg-gray-100/15' : 'bg-transparent'}`}
            >
                <Typography type='small'>
                    {label}
                </Typography>
            </ListItem>
        </Link>
    )
}