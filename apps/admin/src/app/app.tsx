import { Core } from '@content/admin-core';
import { signin } from '@content/admin-signin';
import { projects } from '@content/admin-projects';
import { users } from '@content/admin-users';
import { projectInsights } from '@content/admin-project-insights';
import { projectSettings } from '@content/admin-project-settings';
import { contentLibrary } from '@content/admin-content-library';
import { mediaLibrary } from '@content/admin-media-library';

export function App() {
    return (
        <Core
            environment={{
                production: false,
                api: 'http://localhost:4001'
            }}
            plugins={[
                signin(),
                projects(),
                users(),
                projectInsights(),
                contentLibrary(),
                mediaLibrary(),
                projectSettings()
            ]}
        />
    );
}

export default App;
