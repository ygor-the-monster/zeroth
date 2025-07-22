import { ActionButton } from "@components/ActionButton";
import { LanguageSelector } from "@components/LanguageSelector";
import { ShareButtons } from "@components/ShareButtons";
import { m } from "@i18n/messages";
import { ArrowUpToLine } from "lucide-react";
import { useCallback } from "react";

export function ProjectLayoutSideActions() {
	const scrollToTop = useCallback(() => {
		window.scrollTo({
			behavior: "smooth",
			top: 0,
		});
	}, []);

	return (
		<>
			<LanguageSelector />
			<ShareButtons />
			<ActionButton
				action={scrollToTop}
				display={{
					icon: <ArrowUpToLine />,
					label: m.scroll_to_top_button_label(),
				}}
			/>
		</>
	);
}
