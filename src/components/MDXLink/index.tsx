import type { PropsWithChildren } from "react";
import styles from "./MDXLink.module.css";

export function MDXLink({
	children,
	href,
}: Readonly<PropsWithChildren<HTMLAnchorElement>>) {
	return (
		<a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
			{children}
			<span className={styles.preview}>{href.replace(/^https?:\/\/(www\.)?/, "")}</span>
		</a>
	);
}