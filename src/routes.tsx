import { getLocale } from "@i18n/runtime";
import { LessonLayout } from "@pages/LessonLayout";
import { lazy } from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router";

const Zeroth_00_Banner = lazy(() =>
	import(`@posts/00_zeroth/banner.tsx`).then((module) => ({
		default: module.Banner,
	})),
);
const Zeroth_00_Project_Requirements = lazy(() =>
	import(`@posts/00_zeroth/00_project_requirements/${getLocale()}.mdx`).then(
		(module) => ({
			default: module.default,
		}),
	),
);

export function Routes() {
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route element={<LessonLayout banner={<Zeroth_00_Banner />} />} path="/">
					<Route element={<Zeroth_00_Project_Requirements />} path="/"/>
				</Route>
			</RouterRoutes>
		</BrowserRouter>
	);
}
