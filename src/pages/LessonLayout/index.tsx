import { LanguageSelector } from "@components/LanguageSelector";
import { ArticleProvider } from "@providers/ArticleProvider";
import { Outlet } from "react-router";
import styles from "./LessonLayout.module.css";

export function LessonLayout() {
	return (
		<div className={styles.wrapper}>
			<article className={styles.article}>
				<ArticleProvider>
					<Outlet />
				</ArticleProvider>
			</article>
			<aside className={styles.aside}>
				<LanguageSelector />
			</aside>
		</div>
	);
}
