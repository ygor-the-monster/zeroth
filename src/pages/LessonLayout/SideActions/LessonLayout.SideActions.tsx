import { ActionButton, ActionGroupButton } from "@components/ActionButton";
import { LanguageSelector } from "@components/LanguageSelector";
import { ScrollToTopButton } from "@components/ScrollToTopButton";
import { ShareButtons } from "@components/ShareButtons";
import { m } from "@i18n/messages";
import {
	AArrowDown,
	AArrowUp,
	ALargeSmall,
	ArrowLeftToLine,
} from "lucide-react";
import type { LessonLayoutSideActionsProps } from "./LessonLayout.SideActions.types";

export function LessonLayoutSideActions({
	increaseFontSize,
	decreaseFontSize,
	backToProject,
}: LessonLayoutSideActionsProps) {
	const IncreaseFontSizeAction = {
		action: increaseFontSize,
		display: {
			icon: <AArrowUp />,
			label: m["font_size_buttons.increase_label"](),
		},
		key: "increase",
	};
	const DecreaseFontSizeAction = {
		action: decreaseFontSize,
		display: {
			icon: <AArrowDown />,
			label: m["font_size_buttons.decrease_label"](),
		},
		key: "decrease",
	};

	return (
		<>
			<ActionButton
				action={backToProject}
				display={{
					icon: <ArrowLeftToLine />,
					label: m["back_to_project_button.button_label"](),
				}}
			/>
			<LanguageSelector />
			<ShareButtons />
			<ActionGroupButton
				actions={[IncreaseFontSizeAction, DecreaseFontSizeAction]}
				display={{
					icon: <ALargeSmall />,
					label: m["font_size_buttons.button_label"](),
				}}
			/>
			<ScrollToTopButton />
		</>
	);
}
