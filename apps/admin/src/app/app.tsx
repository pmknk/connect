import { Core } from "@avyyx/admin-core";
import { signin } from "@avyyx/admin-signin";
import { dashboard } from "@avyyx/admin-dashboard";

export function App() {
    return (
        <div className="flex-grow overflow-auto">
            <Core 
                environment={{
                    production: false,
                    api: "http://localhost:4000"
                }}
                plugins={[
                    signin(),
                    dashboard(),
                ]}

            />
        </div>
    );
}

export default App;
