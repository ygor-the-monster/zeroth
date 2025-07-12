// This file cannot use the @ imports because it is used in the vite config file
import type { Configuration } from "../../utils/configTypes";
import { deepFreeze } from "../../utils/deepFreeze";
import { appConfigDefaults } from "./AppConfig.consts";
import { type AppConfig, appConfigSchema } from "./AppConfig.types";

export const appConfig: Configuration<AppConfig> = {
	init: async (config) => {
		if (Object.isFrozen(appConfig)) return;

		// @ts-ignore - import.meta.env is not typed on vite config
		const env = config ?? import.meta.env ?? {};
		const parsedEnv = appConfigSchema.parse({
			...appConfigDefaults,
			...env,
		});

		for (const key of Object.keys(parsedEnv)) {
			if (Object.hasOwn(appConfig, key)) {
				// @ts-expect-error - the objects have the same shape
				appConfig[key] = parsedEnv[key];
			}
		}

		deepFreeze(appConfig);
	},
	...appConfigDefaults,
};
