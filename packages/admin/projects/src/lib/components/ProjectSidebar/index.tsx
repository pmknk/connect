import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import type { ProjectQueryResponse } from "../../hooks/useProjectQuery";
import { ExtendedTheme } from "@content/admin-ui";

type ProjectSidebarProps = {
    project: ProjectQueryResponse['data'];
    menuItems: {
        label: string;
        icon: React.ReactNode;
        href: string;
    }[];
}   

export const ProjectSidebar = ({ project: { name }, menuItems }: ProjectSidebarProps) => {
    const { palette } = useTheme<ExtendedTheme>();
    return (
        <Stack
            sx={{
                gap: 1,
                p: 2,
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
                {menuItems.map(({ label, href, icon }) => (
                    <Tooltip title={(<Typography variant="body2">{label}</Typography>)} placement="right" key={href}>
                        <IconButton 
                            href={href}
                            sx={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                '&:hover': {
                                    backgroundColor: palette.gray[200],
                                },
                                '& svg': {
                                    width: 22,
                                    height: 22,
                                },
                            }}
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Stack>
        </Stack>
    )
}