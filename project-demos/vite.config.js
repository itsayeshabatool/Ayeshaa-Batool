import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative paths so file:// and static hosts work after build
export default defineConfig({
  plugins: [react()],
  base: "./",
});
