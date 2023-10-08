import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/time": {
        target: "ws://127.0.0.1:5000/",
        ws: true,
      },
      "/audio": {
        target: "ws://127.0.0.1:5000/",
        ws: true,
      },
      "/upload": {
        target: "ws://127.0.0.1:5000/",
        ws: true,
      },
      "/quizzes": {
        target: "ws://127.0.0.1:5000/",
        ws: true,
      },
      "/questions": {
        target: "ws://127.0.0.1:5000/",
        ws: true,
      },
      "/quiz-results": {
        target: "ws://127.0.0.1:5000/",
        ws: true,
      },
      "/api": {
        target: "http://127.0.0.1:5000/",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
