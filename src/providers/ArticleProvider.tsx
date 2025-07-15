import { MDXProvider } from "@mdx-js/react";
import type { PropsWithChildren } from "react";

import { MDXLink } from "@components/MDXLink";

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
