import { ActionButton } from "@components/ActionButton";
import { m } from "@i18n/messages";
import { ArrowUpToLine } from "lucide-react";
import { useCallback } from "react";

export function ScrollToTopButton() {
	const scrollToTop = useCallback(() => {
		window.scrollTo({
			behavior: "smooth",
			top: 0,
		});
	}, []);

	return (
		<ActionButton
			action={scrollToTop}
			display={{
				icon: <ArrowUpToLine />,
				label: m["scroll_to_top_button.button_label"](),
			}}
		/>
	);
}
