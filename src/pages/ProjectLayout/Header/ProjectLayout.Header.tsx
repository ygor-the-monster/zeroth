import styles from "./ProjectLayout.Header.module.css";

export function ProjectLayoutHeader() {
	console.log(styles);
	return (
		<header className={styles.container}>
			<span className={styles.number}>00</span>
			<span className={styles.content}>
				<h1>Zeroth Sprint</h1>
				<p> A project directory / blog platform </p>
			</span>
		</header>
	);
}
