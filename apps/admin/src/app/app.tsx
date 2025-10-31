import { Core } from '@content/admin-core';
import { signin } from '@content/admin-signin';
import { projects } from '@content/admin-projects';
import { users } from '@content/admin-users';

export function App() {
    return (
        <Core
            environment={{
                production: false,
                api: 'http://localhost:4001'
            }}
            plugins={[signin(), projects(), users()]}
        />
    );
}

export default App;
