import type { ReactNode } from "react";

export type Lesson = {
	title: string;
	description: string;
	path: string;
};

export type ProjectLayoutProps = {
	banner: ReactNode;
	number: number;
	title: string;
	description: string;
	lessons: Lesson[];
};
