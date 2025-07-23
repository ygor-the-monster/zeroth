import { z } from "zod/v4-mini";
import { zStringBool } from "../../utils/zodExtensions/zStringBool";

export const SourceMapMode = {
	FALSE: false,
	HIDDEN: "hidden",
	INLINE: "inline",
	TRUE: true,
} as const;
export type SourceMapMode = (typeof SourceMapMode)[keyof typeof SourceMapMode];

export const buildConfigSchema = z.object({
	BUILD_OPTIMIZE_PNG: zStringBool(),
	BUILD_OPTIMIZE_PNG_LEVEL: z.coerce
		.number()
		.check(z.minimum(0), z.maximum(7), z.int()),
	BUILD_OPTIMIZE_PNG_SPEED: z.coerce
		.number()
		.check(z.minimum(1), z.maximum(11), z.int()),
	BUILD_OPTIMIZE_PNG_STRIP: zStringBool(),
	BUILD_SOURCE_MAPS: z.union([
		zStringBool(),
		z.literal(SourceMapMode.INLINE),
		z.literal(SourceMapMode.HIDDEN),
	]),
});

export type BuildConfig = z.infer<typeof buildConfigSchema>;
