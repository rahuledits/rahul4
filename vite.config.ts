import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Relaxed Security Headers for Spline and dev
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      // Allow Spline, Vite dev server, HMR, and dynamic imports
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: ws: http://localhost:* http://127.0.0.1:* https://prod.spline.design https://app.spline.design; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: ws: http://localhost:* http://127.0.0.1:* https://prod.spline.design https://app.spline.design; connect-src *; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;",
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
