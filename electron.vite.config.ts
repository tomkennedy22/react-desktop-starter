import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		build: {
			lib: {
				entry: resolve(__dirname, "src/desktop/index.ts"),
			},
		},
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		build: {
			lib: {
				entry: resolve(__dirname, "src/preload/index.ts"),
			},
		},
	},
	renderer: {
		root: resolve(__dirname, "src/frontend"),
		build: {
			outDir: resolve(__dirname, "out/frontend"),
			rollupOptions: {
				input: "src/frontend/index.html",
			},
		},
		resolve: {
			alias: {
				"@frontend": resolve("src/frontend"),
			},
		},
		plugins: [
			tanstackRouter({
				target: "react",
				autoCodeSplitting: true,
				// generatedRouteTree: "src/frontend/src/routeTree.gen.ts",
				// routesDirectory: "src/routes",
			}),
			react(),
			tailwindcss(),
		],
	},
});
