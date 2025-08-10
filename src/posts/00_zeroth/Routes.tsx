import { m } from "@i18n/messages";
import {
	makePostImports,
	makePostRoutes,
	makeProjectRoute,
} from "@utils/makePostRouting";
import type {
	Post,
	Project,
} from "@utils/makePostRouting/makePostRouting.types";
import * as projectIntroductionEN from "./00_project_introduction/en.mdx";
import * as projectIntroductionPT from "./00_project_introduction/pt.mdx";
import * as projectPlanningEN from "./01_project_planning/en.mdx";
import * as projectPlanningPT from "./01_project_planning/pt.mdx";
import { Banner } from "./Banner";

const project: Project = {
	description: m["00_zeroth_project.description"](),
	number: 0,
	path: "00_zeroth",
	title: m["00_zeroth_project.title"](),
};

const lessons: Post[] = await makePostImports([
	[
		"00_project_introduction",
		{ en: projectIntroductionEN, pt: projectIntroductionPT },
	],
	["01_project_planning", { en: projectPlanningEN, pt: projectPlanningPT }],
]);

export const Routes = [
	makeProjectRoute(project, lessons, <Banner />),
	...makePostRoutes(project, lessons, <Banner />),
];
