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
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/upload": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/quizzes": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/deletequiz": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/questions": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/getquestions": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/audiosubmit": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/addquizresult": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/addquestionresult": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/quiz_results": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/question_results": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/compare": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
        ws: true,
      },
      "/getusers": {
        target: "ws://db.uqkijiayajogyreusvdh.supabase.co/",
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
