// This file cannot use the @ imports because it is used in the vite config file
import type { Configuration } from "../../utils/configTypes";
import { deepFreeze } from "../../utils/deepFreeze";
import { metaConfigDefaults } from "./MetaConfig.consts";
import { type MetaConfig, metaConfigSchema } from "./MetaConfig.types";

export const metaConfig: Configuration<MetaConfig> = {
	init: async (config) => {
		if (Object.isFrozen(metaConfig)) return;

		// @ts-ignore - import.meta.env is not typed on vite config
		const env = config ?? import.meta.env ?? {};
		const parsedEnv = metaConfigSchema.parse({
			...metaConfigDefaults,
			...env,
		});

		for (const key of Object.keys(parsedEnv)) {
			if (Object.hasOwn(metaConfig, key)) {
				// @ts-expect-error - the objects have the same shape
				metaConfig[key] = parsedEnv[key];
			}
		}

		deepFreeze(metaConfig);
	},
	...metaConfigDefaults,
};
