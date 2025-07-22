import type { MDXContent } from "mdx/types";
import type { ReactNode } from "react";

export type LessonLayoutProps = {
	banner: ReactNode;
	title: string;
	ArticleMDX: MDXContent;
};
