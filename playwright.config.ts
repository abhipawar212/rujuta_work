import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**000000000  
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.', // ✅ FIX: all test files are in SAME directory

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 4 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1, // 🔒 ensures back-to-back execution

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },

      // ✅ Explicitly define which files to run
      testMatch: [
        'link.spec.ts',
        //'rfq_creation.spec.ts',
        'Seller_Logistic_RFQ.spec.ts',
        'Seller_Logistics_STP_sufin.spec.ts',
        'Sufin_Logistics.spec.ts',
      ],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
