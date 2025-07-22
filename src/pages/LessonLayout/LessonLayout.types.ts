import type { ReactNode } from "react";

export type LessonLayoutProps = {
	banner: ReactNode;
	content: ReactNode;
	metadata: {
		title: string;
	};
};
