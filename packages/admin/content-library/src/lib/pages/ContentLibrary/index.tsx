import { Page } from "@content/admin-ui";
import { ContentLibrarySidebar } from "../../components/ContentLibrarySidebar";
import Box from "@mui/material/Box";

const ContentLibrary = () => {
    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <ContentLibrarySidebar />
            <Page title="Content Library" maxWidth={false}>
                <div>Content Library</div>
            </Page>
        </Box>
    )
}

export default ContentLibrary;


