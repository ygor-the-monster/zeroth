import { LanguageSelector } from "@components/LanguageSelector";
import { ScrollToTopButton } from "@components/ScrollToTopButton";
import { ShareButtons } from "@components/ShareButtons";

export function ProjectLayoutSideActions() {
	return (
		<>
			<LanguageSelector />
			<ShareButtons />
			<ScrollToTopButton />
		</>
	);
}
