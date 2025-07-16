import { useNavigate } from "react-router";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<h1 className={styles.code}>404</h1>
			<h2 className={styles.title}>Page Not Found</h2>
			<p className={styles.message}>
				Sorry, the page you are looking for does not exist or has been moved.
			</p>
			<button
				className={styles.button}
				onClick={() => navigate("/")}
				type="button"
			>
				Go Home
			</button>
		</div>
	);
}
