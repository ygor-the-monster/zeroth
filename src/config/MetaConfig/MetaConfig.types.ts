import { z } from "zod/v4-mini";

export const metaConfigSchema = z.object({
	HEAD_DESCRIPTION: z.string().check(z.minLength(1)),
	HEAD_FAVICON: z.string().check(z.minLength(1)),
	HEAD_THEME_COLOR: z.string().check(z.regex(/^#([0-9a-fA-F]{6})$/)),
	HEAD_TITLE: z.string().check(z.minLength(1)),
});

export type MetaConfig = z.infer<typeof metaConfigSchema>;
