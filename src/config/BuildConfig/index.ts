// This file cannot use the @ imports because it is used in the vite config file
import type { Configuration } from "../../utils/configTypes";
import { deepFreeze } from "../../utils/deepFreeze";
import { buildConfigDefaults } from "./BuildConfig.consts";
import { type BuildConfig, buildConfigSchema } from "./BuildConfig.types";

export const buildConfig: Configuration<BuildConfig> = {
	init: async (config) => {
		if (Object.isFrozen(buildConfig)) return;

		// @ts-ignore - import.meta.env is not typed on vite config
		const env = config ?? import.meta.env ?? {};
		const parsedEnv = buildConfigSchema.parse({
			...buildConfigDefaults,
			...env,
		});

		for (const key of Object.keys(parsedEnv)) {
			if (Object.hasOwn(buildConfig, key)) {
				// @ts-expect-error - the objects have the same shape
				buildConfig[key] = parsedEnv[key];
			}
		}

		deepFreeze(buildConfig);
	},
	...buildConfigDefaults,
};
