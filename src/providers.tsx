import { ConfigProvider } from "@providers/ConfigProvider";
import { HeadProvider } from "@providers/HeadProvider";
import { ThemingProvider } from "@providers/ThemingProvider";
import type { PropsWithChildren } from "react";

export function Providers({ children }: Readonly<PropsWithChildren>) {
	return (
		<ConfigProvider>
			<HeadProvider>
				<ThemingProvider>{children}</ThemingProvider>
			</HeadProvider>
		</ConfigProvider>
	);
}
