import type { AppConfig } from "@config/AppConfig/AppConfig.types";
import type { MetaConfig } from "@config/MetaConfig/MetaConfig.types";
import { ConfigContext } from "@providers/ConfigProvider";
import type { ConfigurationHook } from "@utils/configTypes";
import { useContext } from "react";

export const useAppConfig = (): ConfigurationHook<AppConfig> => {
	const { appConfig, isLoading } = useContext(ConfigContext);
	return { ...appConfig, isLoading };
};

export const useMetaConfig = (): ConfigurationHook<MetaConfig> => {
	const { metaConfig, isLoading } = useContext(ConfigContext);
	return { ...metaConfig, isLoading };
};
