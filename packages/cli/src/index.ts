#!/usr/bin/env node

import { Command } from 'commander';
import { rootCreateAction } from './commands/root-create';


const program = new Command();

program
    .name('avyyx')
    .description('CLI tool for Avyyx CMS')

program
    .command('root:create')
    .description('Create a root user')
    .option('-e, --email <email>', 'Root user email')
    .option('-p, --password <password>', 'Root user password')
    .action(rootCreateAction);

program.parse(process.argv);