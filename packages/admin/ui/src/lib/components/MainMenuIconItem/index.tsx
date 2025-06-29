import IconButton from "@mui/material/IconButton"
import { useTheme } from "@mui/material/styles"
import { ReactNode } from "react"
import { ExtendedTheme } from "../../types"

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
    const {palette} = useTheme<ExtendedTheme>()
    return (
        <IconButton
            key={key}
            sx={{
                color: palette.slate[100],
                backgroundColor: selected ? palette.slate[700] : 'transparent',
                '&:hover': {
                    backgroundColor: selected ? palette.slate[700] : palette.slate[800],
                },
            }}
        >
            {icon}
        </IconButton>
    )
}