import { ArticleProvider } from "@providers/ArticleProvider";
import { Outlet } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import styles from "./LessonLayout.module.css";
import { LessonLayoutSideActions } from "./LessonLayout.SideActions";
import type { LessonLayoutProps } from "./LessonLayout.types";

export function LessonLayout({ banner }: LessonLayoutProps) {
	const [fontSize, setFontSize] = useLocalStorage("article:fontSize", 1);

	const increaseFontSize = () => setFontSize(Math.min(fontSize + 0.1, 1.5));
	const decreaseFontSize = () => setFontSize(Math.max(fontSize - 0.1, 0.5));

	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>{banner}</div>
			<main className={styles.content}>
				<article
					className={styles.article}
					style={{ "--font-multiplier": fontSize }}
				>
					<ArticleProvider>
						<Outlet />
					</ArticleProvider>
				</article>
				<aside className={styles.aside}>
					<LessonLayoutSideActions
						decreaseFontSize={decreaseFontSize}
						increaseFontSize={increaseFontSize}
					/>
				</aside>
			</main>
		</div>
	);
}
