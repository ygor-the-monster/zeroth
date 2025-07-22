import type { PropsWithChildren } from "react";

export function MDXLink({
	children,
	href,
}: Readonly<PropsWithChildren<HTMLAnchorElement>>) {
	return (
		<a
			data-hover-label={href.replace(/^https?:\/\/(www\.)?/, "")}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{children}
		</a>
	);
}
