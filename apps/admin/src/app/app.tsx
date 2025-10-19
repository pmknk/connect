import { Core } from '@connect/admin-core';
import { signin } from '@connect/admin-signin';
import { projects } from '@connect/admin-projects';
import { users } from '@connect/admin-users';

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
