import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173',
  },
  // webServer: {
  //   command: 'npm start',
  //   port: 'http://localhost:5173/',
  // },
});