import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
export default defineConfig({
    base: "/",
    plugins: [svgr(), react()],
    resolve: {
        alias: {
            src: "/src",
        },
    },
});
