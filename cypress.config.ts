import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 2000,
  viewportWidth: 1920,
  video: true,
  e2e: {

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    watchForFileChanges: false
  },

  env: {
    "fullName": "Ilja",
    "email": "iljaTest@inboc.lb"
  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  retries:{
    runMode: 0,
    openMode: 2
  }

})