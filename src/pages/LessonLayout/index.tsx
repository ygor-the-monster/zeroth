import { ArticleProvider } from "@providers/ArticleProvider";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import styles from "./LessonLayout.module.css";
import type { LessonLayoutProps } from "./LessonLayout.types";
import { LessonLayoutSideActions } from "./SideActions/LessonLayout.SideActions";

export function LessonLayout({ banner, ArticleMDX, title }: LessonLayoutProps) {
	const [fontSize, setFontSize] = useLocalStorage("article:fontSize", 1);
	const navigate = useNavigate();

	const increaseFontSize = useCallback(
		() => setFontSize(Math.min(fontSize + 0.1, 1.5)),
		[fontSize, setFontSize],
	);
	const decreaseFontSize = useCallback(
		() => setFontSize(Math.max(fontSize - 0.1, 0.5)),
		[fontSize, setFontSize],
	);

	const backToProject = useCallback(() => {
		const path = window.location.pathname;
		const projectId = path.split("/")[1];
		navigate(`/${projectId}`);
	}, [navigate]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>{banner}</div>
			<main className={styles.content}>
				<article
					className={styles.article}
					style={{ "--font-multiplier": fontSize }}
				>
					<ArticleProvider>
						<h1 className={styles.title}>{title}</h1>
						<ArticleMDX />
					</ArticleProvider>
				</article>
				<aside className={styles.aside}>
					<LessonLayoutSideActions
						backToProject={backToProject}
						decreaseFontSize={decreaseFontSize}
						increaseFontSize={increaseFontSize}
					/>
				</aside>
			</main>
		</div>
	);
}
