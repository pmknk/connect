import { Core } from "@avyyx/admin-core";
import { createSigninPlugin } from "@avyyx/admin-signin";

const plugins = [
    createSigninPlugin()
]

export function App() {
    return (
        <div className="flex-grow overflow-auto">
            <Core 
                environment={{
                    production: false,
                    api: "http://localhost:3000"
                }}
                plugins={plugins}
            />
        </div>
    );
}

export default App;
