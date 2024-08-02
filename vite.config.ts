import { defineConfig, loadEnv, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	const config: UserConfig = {
		resolve: {
			alias: {
				"@": resolve(__dirname, "src")
			},
		},
		plugins: [
			vue(),
			vueJsx(),
			svgLoader(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		]
	};

	if (mode === "development") {
		if (!config.server) {
			config.server = {}
		}

		Object.assign(config.server, {
			proxy: {
				"/api": {
					target: env.VITE_API_HOST,
					changeOrigin: true,
					secure: false,
				},
			}
		})
	}

	return config;
});
