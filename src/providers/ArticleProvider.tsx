import { MDXLink } from "@components/MDXLink";
import { MDXProvider } from "@mdx-js/react";
import type { PropsWithChildren } from "react";

export function ArticleProvider({ children }: Readonly<PropsWithChildren>) {
	return (
		<MDXProvider
			components={{
				a: MDXLink,
			}}
		>
			{children}
		</MDXProvider>
	);
}
