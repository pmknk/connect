import { ReactNode } from "react";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

import { ExtendedTheme } from "@content/admin-ui";
import { renderElement, SlotComponent } from "@content/admin-utils";

import type { ProjectQueryResponse } from "../../hooks/useProjectQuery";

type ProjectSidebarProps = {
    project: ProjectQueryResponse['data'];
    menuItems: SlotComponent[];
}   

export const ProjectSidebar = ({ project: { name }, menuItems }: ProjectSidebarProps) => {
    const { palette } = useTheme<ExtendedTheme>();
    return (
        <Stack
            sx={{
                gap: 1,
                py: 2,
                px: 2,
                borderRight: `1px solid ${palette.divider}`,
            }}
        >
            <Avatar
                variant="rounded"
                sx={{
                    backgroundColor: palette.primary.main,
                }}
            >
                {name.charAt(0)}    
            </Avatar>
            <Divider sx={{ mt: 2 }} />
            <Stack sx={{ gap: 2.6 }}>
                {menuItems.map(({ key, component }) => (
                    renderElement(component, { key })
                ))}
            </Stack>
        </Stack>
    )
}