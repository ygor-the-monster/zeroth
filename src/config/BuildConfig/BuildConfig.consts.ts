import { type BuildConfig, SourceMapMode } from "./BuildConfig.types";

export const buildConfigDefaults: BuildConfig = {
	BUILD_OPTIMIZE_PNG: true,
	BUILD_OPTIMIZE_PNG_LEVEL: 2,
	BUILD_OPTIMIZE_PNG_SPEED: 9,
	BUILD_OPTIMIZE_PNG_STRIP: true,
	BUILD_SOURCE_MAPS: SourceMapMode.FALSE,
};
