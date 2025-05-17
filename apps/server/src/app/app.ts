import { core } from '@avyyx/server-core';


export async function app() {
    console.log(core())
    console.log('Server is running');
}
