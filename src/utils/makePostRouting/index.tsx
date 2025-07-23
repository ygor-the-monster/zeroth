import { getLocale, type Locale } from "@i18n/runtime";
import { LessonLayout } from "@pages/LessonLayout";
import { ProjectLayout } from "@pages/ProjectLayout";
import type { ReactNode } from "react";
import { Route } from "react-router";
import type { Post, Project } from "./makePostRouting.types";

export const makePostImports = async (
	posts: [string, { [key in Locale]: typeof import("*.mdx") }][],
): Promise<Post[]> => {
	return await Promise.all(
		posts.map(async (post) => {
			const postModule = post[1][getLocale()];
			return {
				ArticleMDX: postModule.default,
				metadata: {
					description: postModule.frontmatter.description,
					path: post[0],
					title: postModule.frontmatter.title,
				},
			};
		}),
	);
};

export const makePostRoutes = (
	project: Project,
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
			path={`/${project.path}/${post.metadata.path}`}
		/>
	));
};

export const makeProjectRoute = (
	project: Project,
	posts: Post[],
	Banner: ReactNode,
): ReactNode => {
	return (
		<Route
			element={
				<ProjectLayout
					banner={Banner}
					description={project.description}
					lessons={posts.map((post) => ({
						description: post.metadata.description,
						path: post.metadata.path ?? "#",
						title: post.metadata.title,
					}))}
					number={project.number}
					title={project.title}
				/>
			}
			key={project.path}
			path={`/${project.path}`}
		/>
	);
};
