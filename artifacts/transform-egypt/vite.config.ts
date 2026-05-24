import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Replit-only plugins — conditionally loaded so the build works off-Replit
const replitPlugins = async () => {
  if (process.env.REPL_ID === undefined) return [];
  const plugins = [];
  try {
    const { runtime: runtimeErrorOverlay } = await import(
      "@replit/vite-plugin-runtime-error-modal"
    );
    plugins.push(runtimeErrorOverlay());
  } catch {}
  if (process.env.NODE_ENV !== "production") {
    try {
      const { cartographer } = await import(
        "@replit/vite-plugin-cartographer"
      );
      plugins.push(cartographer());
    } catch {}
  }
  return plugins;
};

export default defineConfig(async () => ({
  plugins: [react(), tailwindcss(), ...(await replitPlugins())],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
}));
