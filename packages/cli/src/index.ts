#!/usr/bin/env node

import inquirer from 'inquirer';
import { Command } from 'commander';

const program = new Command();

program
    .name('avyyx')
    .description('CLI tool for Avyyx CMS')

program
    .command('project:prepare')
    .description('Initialize the project')
    .action(async () => {
        const { adminEmail, adminPassword } = await inquirer.prompt([
            {
                type: 'input',
                name: 'adminEmail',
                message: '[avyyx] Enter admin email:',
                validate: (input) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(input) ? true : 'Please enter a valid email address';
                }
            },
            {
                type: 'password',
                name: 'adminPassword',
                message: '[avyyx] Enter admin password:',
                validate: (input) => {
                    return input.length >= 8 ? true : 'Password must be at least 8 characters long';
                }
            }
        ]);

        console.log('[avyyx] Project initialized');
    });

program.parse(process.argv);