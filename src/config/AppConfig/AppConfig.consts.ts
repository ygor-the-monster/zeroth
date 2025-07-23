import { type AppConfig, AppConfigMode } from "./AppConfig.types";

export const appConfigDefaults: AppConfig = {
	MODE: AppConfigMode.VITE_INITIALIZATION,
	VITE_APP_PORT: 3000,
	VITE_ENV_PREFIXES: ["VITE_", "HEAD_", "BUILD_"],
};
