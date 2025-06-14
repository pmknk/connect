import { config } from 'dotenv';
import axios from 'axios';
import inquirer from 'inquirer';

export async function rootCreateAction(options: { email?: string; password?: string }) {
    try {
        config();

        const PORT = process.env.SERVER_PORT;

        if (!PORT) {
            throw new Error('SERVER_PORT is not set in .env file');
        }

        let rootEmail = options.email;
        let rootPassword = options.password;

        if (!rootEmail || !rootPassword) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'rootEmail',
                    message: '[avyyx] Enter root user email:',
                    validate: (input) => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return emailRegex.test(input) ? true : 'Please enter a valid email address';
                    },
                    when: !rootEmail
                },
                {
                    type: 'password',
                    name: 'rootPassword',
                    message: '[avyyx] Enter root user password:',
                    validate: (input) => {
                        return input.length >= 8 ? true : 'Password must be at least 8 characters long';
                    },
                    when: !rootPassword
                }
            ]);

            rootEmail = rootEmail || answers.rootEmail;
            rootPassword = rootPassword || answers.rootPassword;
        }

        await axios.post(`http://localhost:${PORT}/init`, {
            email: rootEmail,
            password: rootPassword
        });

        console.log('[avyyx] Root user created');
    } catch (error: any) {
        throw new Error(error.message);
    }
} 