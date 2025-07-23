import { appConfig } from "@config/AppConfig";
import type { AppConfig } from "@config/AppConfig/AppConfig.types";
import { buildConfig } from "@config/BuildConfig";
import type { BuildConfig } from "@config/BuildConfig/BuildConfig.types";
import { metaConfig } from "@config/MetaConfig";
import type { MetaConfig } from "@config/MetaConfig/MetaConfig.types";
import type { PropsWithChildren } from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import type { ConfigContextType } from "./ConfigProvider.types";

export const ConfigContext = createContext<ConfigContextType>({
	appConfig: appConfig,
	buildConfig: buildConfig,
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
	const [localBuildConfig, setLocalBuildConfig] =
		useState<BuildConfig>(buildConfig);

	const contextValue = useMemo(
		() => ({
			appConfig: localAppConfig,
			buildConfig: localBuildConfig,
			isLoading,
			metaConfig: localMetaConfig,
		}),
		[localAppConfig, localMetaConfig, localBuildConfig, isLoading],
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

			const { init: buildInit, ...buildConfigNoInit } = buildConfig;
			await buildInit();
			setLocalBuildConfig(buildConfigNoInit);

			setIsLoading(false);
		})();
	}, []);

	return (
		<ConfigContext.Provider value={contextValue}>
			{children}
		</ConfigContext.Provider>
	);
}
