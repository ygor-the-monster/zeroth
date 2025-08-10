import { MDXLink } from "@components/MDXLink";
import { TaskChip } from "@components/TaskChip";
import { MDXProvider } from "@mdx-js/react";
import type { PropsWithChildren } from "react";

export function ArticleProvider({ children }: Readonly<PropsWithChildren>) {
	return (
		<MDXProvider
			components={{
				a: MDXLink,
				TaskChip,
			}}
		>
			{children}
		</MDXProvider>
	);
}
