import type { MDXContent } from "mdx/types";

export type PostMetadata = {
	title: string;
	description: string;
	path?: string;
};

export type Post = {
	ArticleMDX: MDXContent;
	metadata: PostMetadata;
};

export type Project = {
	path: string;
	number: number;
	title: string;
	description: string;
};
