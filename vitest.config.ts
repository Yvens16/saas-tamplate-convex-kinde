import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from 'path'
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './.env.local') });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./vitest-setup.ts'],
    environment: "jsdom",
    exclude: ['node_modules', 'dist', 'convex'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname,'./')
    }
  }
});
