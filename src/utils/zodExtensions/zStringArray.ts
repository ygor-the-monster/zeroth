import { z } from "zod/v4-mini";
import { deepMerge } from "../deepMerge";

type ZStringArrayOptions = {
	separator: string;
	trim: boolean;
	filterEmpty: boolean;
};

export const zStringArray = (options?: Partial<ZStringArrayOptions>) =>
	z.pipe(
		z.string(),
		z.transform((value) => {
			const opts = deepMerge(options ?? {}, {
				filterEmpty: true,
				separator: ",",
				trim: true,
			});

			const split = value.split(opts.separator);
			const trimmed = opts.trim ? split.map((v) => v.trim()) : split;
			const filtered = opts.filterEmpty
				? trimmed.filter((v) => v !== "")
				: trimmed;

			return filtered;
		}),
	);
