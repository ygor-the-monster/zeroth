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
