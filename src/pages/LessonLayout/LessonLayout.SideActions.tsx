import { ActionGroupButton } from "@components/ActionButton";
import { LanguageSelector } from "@components/LanguageSelector";
import { ShareButtons } from "@components/ShareButtons";
import { AArrowDown, AArrowUp, ALargeSmall } from "lucide-react";
import type { LessonLayoutSideActionsProps } from "./LessonLayout.SideActions.types";

export function LessonLayoutSideActions({
	increaseFontSize,
	decreaseFontSize,
}: LessonLayoutSideActionsProps) {
	const IncreaseFontSizeAction = {
		action: increaseFontSize,
		display: {
			icon: <AArrowUp />,
			label: "Increase font size",
		},
		key: "increase",
	};
	const DecreaseFontSizeAction = {
		action: decreaseFontSize,
		display: {
			icon: <AArrowDown />,
			label: "Decrease font size",
		},
		key: "decrease",
	};

	return (
		<>
			<LanguageSelector />
			<ShareButtons />
			<ActionGroupButton
				actions={[IncreaseFontSizeAction, DecreaseFontSizeAction]}
				display={{
					icon: <ALargeSmall />,
					label: "Font size",
				}}
			/>
		</>
	);
}
