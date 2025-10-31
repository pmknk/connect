import { ExtendedTheme } from "@content/admin-ui"

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

import { Link } from "react-router-dom"
import { ReactNode } from "react"

/**
 * Props for the MainMenuItem component
 */
type AppBarButtonProps = {
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
export const AppBarButton = ({ key, href, label, selected }: AppBarButtonProps) => {
    const {palette, spacing} = useTheme<ExtendedTheme>()
    return (
        <Button
            component={Link}
            to={href}
            key={key}
            variant="text"
            size="small"
            sx={{
                height: 34,
                minHeight: 34,
                borderRadius: 0.8,
                color: palette.slate[100],
                backgroundColor: selected ? palette.slate[700] : 'transparent',
                px: spacing(1.5),
                '&:hover': {
                    backgroundColor: selected ? palette.slate[700] : palette.slate[800],
                },
            }}
        >
            <Typography variant="body2" color="white" fontWeight={300}>
                {label}
            </Typography>
        </Button>
    )
}