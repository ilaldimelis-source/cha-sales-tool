const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:5500'
  },
  webServer: {
    command: 'npx http-server . -p 5500',
    url: 'http://127.0.0.1:5500',
    reuseExistingServer: !process.env.CI
  }
});
