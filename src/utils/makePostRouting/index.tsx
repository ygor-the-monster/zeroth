import { LessonLayout } from "@pages/LessonLayout";
import { ProjectLayout } from "@pages/ProjectLayout";
import type { ReactNode } from "react";
import { Route } from "react-router";
import type { Post } from "./makePostRouting.types";
import { getLocale, type Locale } from "@i18n/runtime";

export const makePostImports = async (
	posts: [string, { [key in Locale]: typeof import("*.mdx") }][],
): Promise<Post[]> => {
	return await Promise.all(
		posts.map(async (post) => {
			const postModule = post[1][getLocale()];
			return {
				ArticleMDX: postModule.default,
				metadata: {
					title: postModule.frontmatter.title,
					description: postModule.frontmatter.description,
					path: post[0],
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
