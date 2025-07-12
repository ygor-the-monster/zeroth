import { locales, setLocale } from "@i18n/runtime";
import styles from "./LanguageSelector.module.css";

export function LanguageSelector() {
	const changeLanguage = (language: (typeof locales)[number]) => {
		setLocale(language);
	};

	return (
		<div className={styles.container}>
			{locales.map((locale) => (
				<button
					aria-label={`Switch to ${locale}`}
					className={styles.button}
					key={locale}
					onClick={() => changeLanguage(locale)}
					type="button"
				>
					{locale}
				</button>
			))}
		</div>
	);
}
