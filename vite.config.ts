import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      hooks: "/src/hooks",
      validations: "/src/validations",
      assets: "/src/assets",
      types: "/src/types",
    },
  },
});
