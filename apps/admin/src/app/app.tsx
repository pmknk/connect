import { Core } from "@avyyx/admin-core";
import { signin } from "@avyyx/admin-signin";

export function App() {
    return (
        <Core 
            environment={{
                production: false,
                api: "http://localhost:4000"
            }}
            plugins={[signin()]}

        />
    );
}

export default App;
