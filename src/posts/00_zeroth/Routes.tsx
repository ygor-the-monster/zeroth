import {
	makePostImports,
	makePostRoutes,
	makeProjectRoute,
} from "@utils/makePostRouting";
import type { Post } from "@utils/makePostRouting/makePostRouting.types";
import { Banner } from "./Banner";

const lessons: Post[] = await makePostImports("00_zeroth", [
	"00_project_introduction",
]);

export const Routes = [
	makeProjectRoute("00_zeroth", lessons, <Banner />),
	...makePostRoutes("00_zeroth", lessons, <Banner />),
];
