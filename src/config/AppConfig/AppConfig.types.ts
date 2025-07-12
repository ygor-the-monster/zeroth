import { z } from "zod/v4-mini";
import { zStringArray } from "../../utils/zodExtensions/zStringArray";
import { zStringBool } from "../../utils/zodExtensions/zStringBool";

export const AppConfigMode = {
	DEVELOPMENT: "development",
	PRODUCTION: "production",
	VITE_INITIALIZATION: "init",
} as const;
export type AppConfigMode = (typeof AppConfigMode)[keyof typeof AppConfigMode];

export const appConfigSchema = z.object({
	MODE: z.enum(
		Object.values(AppConfigMode) as [AppConfigMode, ...AppConfigMode[]],
	),
	VITE_APP_PORT: z.coerce
		.number()
		.check(z.minimum(1), z.maximum(65535), z.int()),
	VITE_ENV_PREFIXES: z.union([zStringArray(), z.array(z.string())]),
	VITE_SOURCE_MAPS: z.union([
		zStringBool(),
		z.literal("inline"),
		z.literal("hidden"),
	]),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
