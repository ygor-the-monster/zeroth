import { LessonLayout } from "@pages/LessonLayout";
import { ProjectLayout } from "@pages/ProjectLayout";
import { Route } from "react-router";
import * as Zeroth_00_Project_Requirements from "./00_project_introduction/en.mdx";
import { Banner } from "./banner";

export const Routes = (
	<>
		<Route element={<ProjectLayout banner={<Banner />} />} path="00_zeroth" />
		<Route
			element={
				<LessonLayout
					banner={<Banner />}
					content={<Zeroth_00_Project_Requirements.default />}
					metadata={{
						title: Zeroth_00_Project_Requirements.frontmatter.title,
					}}
				/>
			}
			path="00_zeroth/00_project_introduction"
		/>
	</>
);
