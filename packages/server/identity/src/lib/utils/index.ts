import { randomBytes } from 'crypto';
import { createHmac } from 'crypto';

export const generateHash = (str: string, hashSalt?: string) => {
    const salt = hashSalt || randomBytes(16).toString('hex');
    const hash = createHmac('sha256', salt).update(str).digest('hex');
    return { salt, hash };
};
