import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react'
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import fs from "fs-extra";

const folder = {
    src: "src/", // source files
    src_assets: "src/assets/", // source assets files
    dist: "dist/", // build files
    dist_assets: "dist/assets/", //build assets files
};
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        handlebars({
            // eslint-disable-next-line no-undef
            partialDirectory: resolve(__dirname, "src/partials"),
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(new URL("index.html", import.meta.url).pathname),
            },
            output: {
                assetFileNames: ({ name }) => {
                    if (/\.(png|jpg|jpeg|svg)$/.test(name ?? "")) {
                        return "assets/[name]-[hash][extname]";
                    }
                    if (/\.js$/.test(name ?? "")) {
                        return "assets/js/[name]-[hash].js";
                    }
                    return "assets/[name]-[hash][extname]";
                },
            },
        },
    },
});
