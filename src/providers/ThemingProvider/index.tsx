import type { PropsWithChildren } from "react";

import "@acab/reset.css";
import "./rootVariables/colorVariables.css";
import "./rootVariables/fontVariables.css";
import "./rootVariables/sizingVariables.css";

export function ThemingProvider({ children }: Readonly<PropsWithChildren>) {
	return children;
}
