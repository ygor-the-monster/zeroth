import { LanguageSelector } from "@components/LanguageSelector";
import { ArticleProvider } from "@providers/ArticleProvider";
import { Outlet } from "react-router";
import styles from "./LessonLayout.module.css";
import type { LessonLayoutProps } from "./LessonLayout.types";

export function LessonLayout({ banner }: LessonLayoutProps) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>{banner}</div>
			<main className={styles.content}>
				<article className={styles.article}>
					<ArticleProvider>
						<Outlet />
					</ArticleProvider>
				</article>
				<aside className={styles.aside}>
					<LanguageSelector />
				</aside>
			</main>
		</div>
	);
}
