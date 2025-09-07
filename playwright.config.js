import { defineConfig, devices } from '@playwright/test';
import './configs/env.config.js'; // loads .env based on ENV

const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com/';

export default defineConfig({
  testDir: './tests',
  timeout: process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT) : 30000,
  // retries: process.env.TEST_RETRIES ? parseInt(process.env.TEST_RETRIES) : 1,
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // ensures .only fails in CI
  reporter: [['html'], ['list']],
  use: {
    baseURL: BASE_URL,
    headless: process.env.HEADLESS !== 'false',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
