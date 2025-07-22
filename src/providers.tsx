import { ConfigProvider } from "@providers/ConfigProvider";
import { HeadProvider } from "@providers/HeadProvider";
import { HoverLabelProvider } from "@providers/HoverLabelProvider";
import { ThemingProvider } from "@providers/ThemingProvider";
import { ToastProvider } from "@providers/ToastProvider";
import type { PropsWithChildren } from "react";

export function Providers({ children }: Readonly<PropsWithChildren>) {
	return (
		<ConfigProvider>
			<HeadProvider>
				<ThemingProvider>
					<HoverLabelProvider>
						<ToastProvider>{children}</ToastProvider>
					</HoverLabelProvider>
				</ThemingProvider>
			</HeadProvider>
		</ConfigProvider>
	);
}
