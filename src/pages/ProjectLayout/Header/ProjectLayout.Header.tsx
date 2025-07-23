import styles from "./ProjectLayout.Header.module.css";
import type { ProjectLayoutHeaderProps } from "./ProjectLayout.Header.types";

export function ProjectLayoutHeader({
	number,
	title,
	description,
}: ProjectLayoutHeaderProps) {
	console.log(styles);
	return (
		<header className={styles.container}>
			<span className={styles.number}>{number.toString().padStart(2, "0")}</span>
			<span className={styles.content}>
				<h1>{title}</h1>
				<p>{description}</p>
			</span>
		</header>
	);
}
