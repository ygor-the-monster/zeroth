import {
	makePostImports,
	makePostRoutes,
	makeProjectRoute,
} from "@utils/makePostRouting";
import type { Post } from "@utils/makePostRouting/makePostRouting.types";
import * as projectIntroductionEN from "./00_project_introduction/en.mdx";
import * as projectIntroductionPT from "./00_project_introduction/pt.mdx";
import { Banner } from "./Banner";

const lessons: Post[] = await makePostImports([
	[
		"00_project_introduction",
		{ en: projectIntroductionEN, pt: projectIntroductionPT },
	],
]);

export const Routes = [
	makeProjectRoute("00_zeroth", lessons, <Banner />),
	...makePostRoutes("00_zeroth", lessons, <Banner />),
];
