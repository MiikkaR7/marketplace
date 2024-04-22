import { defineConfig } from "cypress";
export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://172.16.4.202:5030',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});