import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        relativeUrls: true,
        modifyVars: {
          "@primary-color": "#3c3f57",
          "@font-family": "'Inter', sans-serif",
          "@border-radius-base": "0.382rem",
          "@modal-header-border-width": 0,
          "@modal-footer-border-width": 0,
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@ant-design/icons"],
  },
  server: {
    // fs: {
    //   allow: ["."],
    // },
    watch: {
      usePolling: true,
    },
  },
  base: "/asramj",
  plugins: [
    react({
      include: ["**/*.tsx", "**/*.ts", "**/*.less"],
    }),
    reactRefresh(),
    tsconfigPaths(),
    nodePolyfills(),
  ],
});
