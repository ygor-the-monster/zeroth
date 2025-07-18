import { ActionGroupButton } from "@components/ActionButton";
import type { ActionGroupButtonProps } from "@components/ActionButton/ActionButton.types";
import { m } from "@i18n/messages";
import { getLocale, locales, setLocale } from "@i18n/runtime";
import { Languages } from "lucide-react";
import { useMemo } from "react";
import styles from "./LanguageSelector.module.css";

export function LanguageSelector({
	className,
	data,
}: Pick<ActionGroupButtonProps, "className" | "data">) {
	const languages = useMemo(
		() =>
			locales.map((locale) => ({
				action: () => setLocale(locale),
				className: locale === getLocale() ? styles.currentButton : undefined,
				display: {
					icon: <>{locale}</>,
					label: m.language_selector_dropdown_button_label({
						language: locale,
					}),
				},
				key: locale,
			})),
		[],
	);

	return (
		<ActionGroupButton
			actions={languages}
			className={className}
			data={data}
			display={{
				icon: <Languages />,
				label: m.language_selector_button_label(),
			}}
		/>
	);
}
