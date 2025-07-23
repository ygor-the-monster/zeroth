import { resolve } from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react-oxc";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, loadEnv } from "vite";
import { faviconsPlugin } from "vite-plugin-favicons";
import viteImagemin from "vite-plugin-imagemin";
import svgr from "vite-plugin-svgr";
import { appConfig } from "./src/config/AppConfig";
import { buildConfig } from "./src/config/BuildConfig";
import { metaConfig } from "./src/config/MetaConfig";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
	process.env = { ...process.env, ...loadEnv(mode, "./", "") };
	appConfig.init(process.env);
	metaConfig.init(process.env);
	buildConfig.init(process.env);

	return defineConfig({
		build: {
			rollupOptions: {
				output: {
					advancedChunks: {
						groups: [{ name: "react", test: /\/react(?:-dom|router)?/ }],
					},
				},
			},
			sourcemap: buildConfig.BUILD_SOURCE_MAPS,
		},
		envPrefix: appConfig.VITE_ENV_PREFIXES,
		optimizeDeps: {
			exclude: ["@mdx-js/react"],
		},
		plugins: [
			paraglideVitePlugin({
				emitGitIgnore: false,
				emitPrettierIgnore: false,
				outdir: "./src/i18n/build",
				project: "./i18n.inlang",
				strategy: ["localStorage", "preferredLanguage", "baseLocale"],
			}),
			react({}),
			cloudflare({}),
			mdx({
				providerImportSource: "@mdx-js/react",
				remarkPlugins: [
					remarkFrontmatter,
					[remarkMdxFrontmatter, { default: {} }],
				],
			}),
			viteImagemin({
				optipng: buildConfig.BUILD_OPTIMIZE_PNG
					? {
							optimizationLevel: buildConfig.BUILD_OPTIMIZE_PNG_LEVEL,
						}
					: false,
				pngquant: buildConfig.BUILD_OPTIMIZE_PNG
					? {
							speed: buildConfig.BUILD_OPTIMIZE_PNG_SPEED,
							strip: buildConfig.BUILD_OPTIMIZE_PNG_STRIP,
						}
					: false,
				svgo: false,
			}),
			svgr({
				svgrOptions: {
					plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
				},
			}),
			faviconsPlugin({
				appDescription: metaConfig.HEAD_DESCRIPTION,
				appName: metaConfig.HEAD_TITLE,
				background: metaConfig.HEAD_THEME_COLOR,
				imgSrc: resolve(__dirname, "src/assets", metaConfig.HEAD_FAVICON),
				path: "/",
				theme_color: metaConfig.HEAD_THEME_COLOR,
			}),
		],
		preview: {
			port: appConfig.VITE_APP_PORT,
		},
		resolve: {
			alias: {
				"@assets": resolve(__dirname, "./src/assets"),
				"@components": resolve(__dirname, "./src/components"),
				"@config": resolve(__dirname, "./src/config"),
				"@hooks": resolve(__dirname, "./src/hooks"),
				"@i18n": resolve(__dirname, "./src/i18n/build"),
				"@pages": resolve(__dirname, "./src/pages"),
				"@posts": resolve(__dirname, "./src/posts"),
				"@providers": resolve(__dirname, "./src/providers"),
				"@utils": resolve(__dirname, "./src/utils"),
			},
		},
		server: {
			port: appConfig.VITE_APP_PORT,
		},
	});
};
