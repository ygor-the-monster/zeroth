import { MDXProvider } from "@mdx-js/react";
import { Outlet } from "react-router";
import styles from "./LessonLayout.module.css";
import { LanguageSelector } from "@components/LanguageSelector";

export function LessonLayout() {
	return (
		<MDXProvider>
			<div className={styles.container}>
				<article>
					<Outlet />
				</article>
				<LanguageSelector />
			</div>
		</MDXProvider>
	);
}
