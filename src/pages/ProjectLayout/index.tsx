import { Link } from "react-router";
import styles from "./ProjectLayout.module.css";
import type { ProjectLayoutProps } from "./ProjectLayout.types";

export function ProjectLayout({ banner }: ProjectLayoutProps) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>{banner}</div>
			<main className={styles.container}>
				<header className={styles.header}>
					<span className={styles.header_number}>00</span>
					<span className={styles.header_content}>
						<h1>Zeroth Sprint</h1>
						<p> A project directory / blog platform </p>
					</span>
				</header>
				<ul className={styles.nav}>
					<li>
						<Link to="/00_zeroth/00_project_introduction">
							Project Introduction
						</Link>
					</li>
					<li>
						<Link to="/00_zeroth/00_project_introduction">
							Project Introduction
						</Link>
					</li>
					<li>
						<Link to="/00_zeroth/00_project_introduction">
							Project Introduction
						</Link>
					</li>
					<li>
						<Link to="/00_zeroth/00_project_introduction">
							Project Introduction
						</Link>
					</li>
					<li>
						<Link to="/00_zeroth/00_project_introduction">
							Project Introduction
						</Link>
					</li>
					<li>
						<Link to="/00_zeroth/00_project_introduction">
							Project Introduction
						</Link>
					</li>
					<li>
						<Link to="/00_zeroth/00_project_introduction">
							Project Introduction
						</Link>
					</li>
				</ul>
			</main>
		</div>
	);
}
