import { config } from 'dotenv';
import { envUtil } from "../utils/env.util"

export const createConfig = <T>(callback: (env: typeof envUtil) => T) => {
    config();
    return callback(envUtil);
}