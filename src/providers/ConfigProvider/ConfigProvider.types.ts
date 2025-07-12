import type { AppConfig } from "@config/AppConfig/AppConfig.types";
import type { MetaConfig } from "@config/MetaConfig/MetaConfig.types";

export type ConfigContextType = {
	isLoading: boolean;
	appConfig: AppConfig;
	metaConfig: MetaConfig;
};
