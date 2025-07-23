import { m } from "@i18n/messages";
import { useNavigate } from "react-router";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<h1 className={styles.code}>404</h1>
			<h2 className={styles.title}>{m.page_not_found_title()}</h2>
			<p className={styles.message}>{m.page_not_found_message()}</p>
			<button
				className={styles.button}
				onClick={() => navigate("/")}
				type="button"
			>
				{m.button_go_home()}
			</button>
		</div>
	);
}
