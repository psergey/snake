import { defineConfig } from "vite";
import libpath from "path";
import react from "@vitejs/plugin-react";

const baseUrl = "./src/";
const alias = [
  ["@components", "./components"],
  ["@hooks", "./hooks"],
  ["@models", "./models"],
].map(([name, path]) => ({
  find: name,
  replacement: libpath.resolve(__dirname, baseUrl, path),
}));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: alias,
  },
});
