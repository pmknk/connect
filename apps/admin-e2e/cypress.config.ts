import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        ...nxE2EPreset(__filename, {
            cypressDir: 'cypress',
            webServerCommands: {
                default: 'nx run admin:serve',
                production: 'nx run admin:serve:production'
            }
        }),
        specPattern: [
            'cypress/e2e/**/*.feature',
            'cypress/e2e/**/*.cy.{ts,tsx,js,jsx}'
        ],
        async setupNodeEvents(on, config) {
            const cucumberModule: any = await import(
                '@badeball/cypress-cucumber-preprocessor'
            );
            const esbuildPluginModule: any = await import(
                '@badeball/cypress-cucumber-preprocessor/esbuild'
            );
            const esbuildPreprocessorModule: any = await import(
                '@bahmutov/cypress-esbuild-preprocessor'
            );

            const addCucumber =
                cucumberModule?.addCucumberPreprocessorPlugin ??
                cucumberModule?.default;

            if (typeof addCucumber !== 'function') {
                throw new Error(
                    'Unable to resolve addCucumberPreprocessorPlugin'
                );
            }
            await addCucumber(on, config);

            const createEsbuildPlugin =
                esbuildPluginModule?.createEsbuildPlugin ??
                esbuildPluginModule?.default;
            const createBundler =
                esbuildPreprocessorModule?.createBundler ??
                esbuildPreprocessorModule?.default ??
                esbuildPreprocessorModule;

            on(
                'file:preprocessor',
                createBundler({
                    plugins: [createEsbuildPlugin(config)]
                })
            );

            // Ensure Cypress exits when running headless so Nx unpins the dev server
            if (!config.isInteractive) {
                on('after:run', () => {
                    process.exit(0);
                });
            }
            return config;
        },
        baseUrl: 'http://localhost:4000'
    }
});
