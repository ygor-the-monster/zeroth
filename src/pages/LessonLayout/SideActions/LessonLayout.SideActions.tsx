import { ActionButton, ActionGroupButton } from "@components/ActionButton";
import { LanguageSelector } from "@components/LanguageSelector";
import { ShareButtons } from "@components/ShareButtons";
import { m } from "@i18n/messages";
import {
	AArrowDown,
	AArrowUp,
	ALargeSmall,
	ArrowLeftToLine,
	ArrowUpToLine,
} from "lucide-react";
import { useCallback } from "react";
import type { LessonLayoutSideActionsProps } from "./LessonLayout.SideActions.types";

export function LessonLayoutSideActions({
	increaseFontSize,
	decreaseFontSize,
	backToProject,
}: LessonLayoutSideActionsProps) {
	const scrollToTop = useCallback(() => {
		window.scrollTo({
			behavior: "smooth",
			top: 0,
		});
	}, []);

	const IncreaseFontSizeAction = {
		action: increaseFontSize,
		display: {
			icon: <AArrowUp />,
			label: m.font_size_buttons_increase_label(),
		},
		key: "increase",
	};
	const DecreaseFontSizeAction = {
		action: decreaseFontSize,
		display: {
			icon: <AArrowDown />,
			label: m.font_size_buttons_decrease_label(),
		},
		key: "decrease",
	};

	return (
		<>
			<ActionButton
				action={backToProject}
				display={{
					icon: <ArrowLeftToLine />,
					label: m.back_to_project_button_label(),
				}}
			/>
			<LanguageSelector />
			<ShareButtons />
			<ActionGroupButton
				actions={[IncreaseFontSizeAction, DecreaseFontSizeAction]}
				display={{
					icon: <ALargeSmall />,
					label: m.font_size_buttons_label(),
				}}
			/>
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
