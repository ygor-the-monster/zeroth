import { getLocale } from "@i18n/runtime";
import { LessonLayout } from "@pages/LessonLayout";
import { ProjectLayout } from "@pages/ProjectLayout";
import { lazy } from "react";
import { Route } from "react-router";
import { Banner } from "./banner";

const Zeroth_00_Project_Requirements = lazy(() =>
	import(`@posts/00_zeroth/00_project_introduction/${getLocale()}.mdx`).then(
		(module) => ({
			default: module.default,
		}),
	),
);

export const Routes = (
	<>
		<Route element={<ProjectLayout banner={<Banner />} />} path="00_zeroth" />
		<Route element={<LessonLayout banner={<Banner />} />} path="00_zeroth/*">
			<Route
				element={<Zeroth_00_Project_Requirements />}
				path="00_project_introduction"
			/>
		</Route>
	</>
);
