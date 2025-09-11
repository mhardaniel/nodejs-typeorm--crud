import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
    specPattern: 'cypress/**/*.spec.{js,jsx,ts,tsx}',
    // supportFile: 'cypress/support/e2e.ts',
  },
  env: {
    apiUrl: 'http://localhost:3000/api',
  },
});
