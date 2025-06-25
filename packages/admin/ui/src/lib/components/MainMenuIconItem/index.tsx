import { IconButton, ListItem } from "@material-tailwind/react"
import { ReactNode } from "react"

/**
 * Props for the MainMenuIconItem component
 */
type MainMenuIconItemProps = {
    /** Unique identifier for the menu item */
    key: string
    /** Icon element to display */
    icon: ReactNode
    /** Label text or element for the menu item */
    label: string | ReactNode
    /** Whether the menu item is currently selected */
    selected?: boolean
}

/**
 * A menu item component that displays an icon with optional selection state
 * 
 * @param props - The component props
 * @param props.key - Unique identifier for the menu item
 * @param props.icon - Icon element to display
 * @param props.label - Label text or element for the menu item (currently unused in render)
 * @param props.selected - Whether the menu item is currently selected
 * @returns A ListItem component with icon and styling based on selection state
 */
export const MainMenuIconItem = ({ key, icon, selected }: MainMenuIconItemProps) => {
    return (
        <IconButton
            key={key}
            className={`text-gray-100 hover:text-white hover:bg-gray-100/15 rounded-md active:bg-gray-100/15 ${selected ? 'bg-gray-100/15' : 'bg-transparent'}`}
            variant="ghost"
            size="sm"
        >
            {icon}
        </IconButton>
    )
}