import { defineConfig } from '@playwright/test';

const PORT = 4173;
// Point E2E_BASE_URL at an already running build to skip the built-in server.
const externalBaseURL = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // A browser that dies on start-up (on Windows this shows up as "write UNKNOWN") is not a
  // layout bug. Retry once locally and twice on CI; a test that passes on retry is reported as "flaky".
  retries: process.env.CI ? 2 : 1,
  reporter: 'list',
  use: {
    baseURL: externalBaseURL ?? `http://localhost:${PORT}`,
  },
  webServer: externalBaseURL
    ? undefined
    : {
        // `--mode e2e` exposes the game store on window so the suite can preview every Hero theme.
        command: `pnpm exec vite build --mode e2e --outDir dist-e2e && pnpm exec vite preview --outDir dist-e2e --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
