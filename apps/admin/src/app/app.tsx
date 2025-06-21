import { Core } from "@avyyx/admin-core";
import { signin } from "@avyyx/admin-signin";
import { projects } from '@avyyx/admin-projects'
import { users } from '@avyyx/admin-users'

export function App() {
    return (
        <Core 
            environment={{
                production: false,
                api: "http://localhost:4000"
            }}
            plugins={[
                signin(),
                projects(),
                users()
            ]}

        />
    );
}

export default App;
