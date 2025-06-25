import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ListItem, Typography } from "@material-tailwind/react"

/**
 * Props for the MainMenuItem component
 */
type MainMenuItemProps = {
    /** Unique identifier for the menu item */
    key: string
    /** URL path for navigation */
    href: string
    /** Display text or React node for the menu item */
    label: string | ReactNode
    /** Whether the menu item is currently selected */
    selected?: boolean
}

/**
 * MainMenuItem component for navigation menu items
 * 
 * @param props - The component props
 * @param props.key - Unique identifier for the menu item
 * @param props.href - URL path for navigation
 * @param props.label - Display text or React node for the menu item
 * @param props.selected - Whether the menu item is currently selected
 * @returns A clickable menu item with hover and selection states
 */
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