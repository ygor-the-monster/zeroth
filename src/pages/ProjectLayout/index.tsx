import { useEffect } from "react";
import { ProjectLayoutHeader } from "./Header/ProjectLayout.Header";
import { ProjectLayoutLessonCard } from "./LessonCard/ProjectLayout.LessonCard";
import styles from "./ProjectLayout.module.css";
import type { ProjectLayoutProps } from "./ProjectLayout.types";
import { ProjectLayoutSideActions } from "./SideActions/ProjectLayout.SideActions";

export function ProjectLayout({
	banner,
	lessons,
	number,
	title,
	description,
}: ProjectLayoutProps) {
	useEffect(() => {
		const actions = document.querySelector(`.${styles.actions}`) as HTMLElement;
		const container = document.querySelector(
			`.${styles.content}`,
		) as HTMLElement;

		if (!actions || !container) return;

		const handleScroll = () => {
			const containerRect = container.getBoundingClientRect();
			const topPosition = Math.max(0, containerRect.top) + 32;
			const rightPosition = containerRect.left;

			actions.style.top = `${topPosition}px`;
			actions.style.right = `${rightPosition}px`;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);
	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>{banner}</div>
			<main className={styles.container}>
				<ProjectLayoutHeader
					description={description}
					number={number}
					title={title}
				/>
				<div className={styles.content}>
					<ul className={styles.grid}>
						{lessons.map((lesson, idx) => (
							<li key={`${lesson.path}-${idx}`}>
								<ProjectLayoutLessonCard
									description={lesson.description}
									idx={idx}
									path={lesson.path ?? ""}
									title={lesson.title}
								/>
							</li>
						))}
					</ul>
					<aside className={styles.actions}>
						<ProjectLayoutSideActions />
					</aside>
				</div>
			</main>
		</div>
	);
}
