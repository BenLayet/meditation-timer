// filepath: /workspaces/meditation-timer/packages/backend/vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["./test/integration/**/*.it.test.js"],
  },
});
