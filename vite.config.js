import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // ✅ Change from "dist" to "build"
    chunkSizeWarningLimit: 1000, // ✅ Adjust chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // ✅ Improve chunking by splitting vendor files
          }
        },
      },
    },
  },
});
