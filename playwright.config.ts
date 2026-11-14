import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || `http://localhost:${PORT}`;
const isRemote = !!process.env.PLAYWRIGHT_TEST_BASE_URL;

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],

    expect: {
        toHaveScreenshot: { animations: 'disabled', caret: 'hide', scale: 'css' },
    },

    use: {
        baseURL,
        trace: 'on-first-retry',
    },

    projects: [
        { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
        { name: 'Tablet', use: { ...devices['iPad (gen 7)'] } },
        { name: 'Mobile', use: { ...devices['iPhone 13'] } },
    ],

    // Tests run against the production static export (the same artefact GitHub
    // Pages serves). Set PW_DEV=1 to use the dev server instead.
    webServer: isRemote
        ? undefined
        : {
              command: process.env.PW_DEV ? 'npm run dev' : `npm run build && npx serve out -l ${PORT}`,
              url: baseURL,
              reuseExistingServer: !process.env.CI,
              timeout: 180_000,
              stdout: 'pipe',
              stderr: 'pipe',
          },
});
