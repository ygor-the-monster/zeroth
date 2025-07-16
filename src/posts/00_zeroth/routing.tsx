import { getLocale } from "@i18n/runtime";
import { LessonLayout } from "@pages/LessonLayout";
import { lazy } from "react";
import { Navigate, Route } from "react-router";
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
		<Route
			element={<Navigate replace to="/00_zeroth/00_project_introduction" />}
			path="00_zeroth"
		/>
		<Route element={<LessonLayout banner={<Banner />} />} path="00_zeroth/*">
			<Route
				element={<Zeroth_00_Project_Requirements />}
				path="00_project_introduction"
			/>
		</Route>
	</>
);
