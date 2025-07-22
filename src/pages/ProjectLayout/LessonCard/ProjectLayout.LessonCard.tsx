import { Link } from "react-router";
import styles from "./ProjectLayout.LessonCard.module.css";
import type { ProjectLayoutLessonCardProps } from "./ProjectLayout.LessonCard.types";

export function ProjectLayoutLessonCard({
	path,
	idx,
	title,
	description,
}: ProjectLayoutLessonCardProps) {
	return (
		<Link className={styles.container} to={path ?? "#"}>
			<span className={styles.number}>{idx.toString().padStart(2, "0")}</span>
			<span className={styles.title}>{title}</span>
			<span className={styles.description}>{description}</span>
		</Link>
	);
}
