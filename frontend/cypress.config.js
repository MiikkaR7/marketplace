import { defineConfig } from "cypress";
export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});