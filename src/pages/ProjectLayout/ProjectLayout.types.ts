import type { ReactNode } from "react";

export type Lesson = {
	title: string;
	description: string;
	path: string;
};

export type ProjectLayoutProps = {
	banner: ReactNode;
	lessons: Lesson[];
};
