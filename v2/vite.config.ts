import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" keeps asset paths relative, so the build works at the domain root or in a subfolder.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
