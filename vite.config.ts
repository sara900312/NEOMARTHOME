import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const subProjectMiddleware = {
  name: "sub-project-middleware",
  apply: "serve",
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split("?")[0]; // Remove query string
        let projectDir = null;
        let subPath = null;

        // Route to beauty project
        if (url.startsWith("/beauty")) {
          projectDir = "cosmetic-1-19-2026v6";
          subPath = url.slice("/beauty".length) || "/";
        }
        // Route to computer/gaming project
        else if (url.startsWith("/pc")) {
          projectDir = "pc-9-17-2025";
          subPath = url.slice("/pc".length) || "/";
        }

        if (projectDir && subPath) {
          // Try to find the file in the project directory
          let filePath = path.join(__dirname, projectDir, subPath);

          // If it's a directory or root path, serve index.html
          if (filePath.endsWith("/") || (!filePath.includes(".") && !fs.existsSync(filePath))) {
            filePath = path.join(__dirname, projectDir, "index.html");
          }

          if (fs.existsSync(filePath)) {
            // Serve the file
            const content = fs.readFileSync(filePath, "utf-8");
            res.end(content);
            return;
          }
        }

        next();
      });
    };
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), subProjectMiddleware].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
