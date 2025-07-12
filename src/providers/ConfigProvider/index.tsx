import { appConfig } from "@config/AppConfig";
import type { AppConfig } from "@config/AppConfig/AppConfig.types";
import { metaConfig } from "@config/MetaConfig";
import type { MetaConfig } from "@config/MetaConfig/MetaConfig.types";
import type { PropsWithChildren } from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import type { ConfigContextType } from "./ConfigProvider.types";

export const ConfigContext = createContext<ConfigContextType>({
	appConfig: appConfig,
	isLoading: true,
	metaConfig: metaConfig,
});

export function ConfigProvider({ children }: Readonly<PropsWithChildren>) {
	const { init: _appInit, ...appConfigNoInit } = appConfig;

	const [isLoading, setIsLoading] = useState(true);
	const [localAppConfig, setLocalAppConfig] =
		useState<AppConfig>(appConfigNoInit);
	const [localMetaConfig, setLocalMetaConfig] =
		useState<MetaConfig>(metaConfig);

	const contextValue = useMemo(
		() => ({
			appConfig: localAppConfig,
			isLoading,
			metaConfig: localMetaConfig,
		}),
		[localAppConfig, localMetaConfig, isLoading],
	);

	useEffect(() => {
		setIsLoading(true);

		(async () => {
			const { init: appInit, ...appConfigNoInit } = appConfig;
			await appInit();
			setLocalAppConfig(appConfigNoInit);

			const { init: metaInit, ...metaConfigNoInit } = metaConfig;
			await metaInit();
			setLocalMetaConfig(metaConfigNoInit);

			setIsLoading(false);
		})();
	}, []);

	return (
		<ConfigContext.Provider value={contextValue}>
			{children}
		</ConfigContext.Provider>
	);
}
