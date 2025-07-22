import type { Simplify } from "type-fest";

export type Configuration<T extends Record<string, unknown>> = Simplify<
	{
		init: (config?: Record<string, unknown>) => Promise<void>;
	} & T
>;

export type ConfigurationHook<T> = Simplify<
	{
		isLoading: boolean;
	} & T
>;
