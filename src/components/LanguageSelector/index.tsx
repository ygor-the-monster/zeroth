import { getLocale, locales, setLocale } from "@i18n/runtime";
import { Languages } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./LanguageSelector.module.css";
import { m } from "@i18n/messages";

export function LanguageSelector() {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(document.createElement("div"));
	useOnClickOutside(ref, () => setIsOpen(false));

	const currentLocale = useMemo(() => getLocale(), []);
	const localesLength = useMemo(() => locales.length, []);
	const changeLocale = useCallback((language: (typeof locales)[number]) => {
		setLocale(language);
	}, []);

	return (
		<div className={styles.container} ref={ref}>
			<button
				aria-label={m.language_selector_button_label()}
				className={styles.button}
				onClick={() => setIsOpen(!isOpen)}
				type="button"
			>
				<Languages />
			</button>
			<div
				className={styles.dropdown}
				data-open={isOpen}
				style={{ "--locales-length": localesLength }}
			>
				{locales.map((locale) => (
					<button
						aria-label={m.language_selector_dropdown_button_label({ language: locale })}
						className={styles.button}
						data-current={currentLocale === locale}
						key={locale}
						onClick={() => changeLocale(locale)}
						type="button"
					>
						{locale}
					</button>
				))}
			</div>
		</div>
	);
}
