import { getLocale } from "@i18n/runtime";
import { LessonLayout } from "@pages/LessonLayout";
import { ProjectLayout } from "@pages/ProjectLayout";
import type { ReactNode } from "react";
import { Route } from "react-router";
import type { Post } from "./makePostRouting.types";

export const makePostImports = async (
	project: string,
	posts: string[],
): Promise<Post[]> => {
	return await Promise.all(
		posts.map(async (post) => {
			const postPath = `../../posts/${project}/${post}/${getLocale()}.mdx`;
			const postModule = await import(postPath /* @vite-ignore */);
			return {
				ArticleMDX: postModule.default,
				metadata: {
					...postModule.frontmatter,
					path: post,
				},
			};
		}),
	);
};

export const makePostRoutes = (
	project: string,
	posts: Post[],
	Banner: ReactNode,
): ReactNode[] => {
	return posts.map((post) => (
		<Route
			element={
				<LessonLayout
					ArticleMDX={post.ArticleMDX}
					banner={Banner}
					title={post.metadata.title}
				/>
			}
			key={post.metadata.path}
			path={`/${project}/${post.metadata.path}`}
		/>
	));
};

export const makeProjectRoute = (
	project: string,
	posts: Post[],
	Banner: ReactNode,
): ReactNode => {
	return (
		<Route
			element={
				<ProjectLayout
					banner={Banner}
					lessons={posts.map((post) => ({
						description: post.metadata.description,
						path: post.metadata.path ?? "#",
						title: post.metadata.title,
					}))}
				/>
			}
			key={project}
			path={`/${project}`}
		/>
	);
};
