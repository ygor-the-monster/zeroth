import { Routes as Zeroth_00 } from "@posts/00_zeroth/routing";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes as RouterRoutes,
} from "react-router";

export function Routes() {
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route
					element={<Navigate replace to="/00_zeroth/00_project_introduction" />}
					path="/"
				/>
				{Zeroth_00}
			</RouterRoutes>
		</BrowserRouter>
	);
}
