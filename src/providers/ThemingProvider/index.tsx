import type { PropsWithChildren } from "react";

import "@acab/reset.css";
import "./generalAdjustments/removeSelection.css";
import "./rootVariables/colorVariables.css";
import "./rootVariables/fontVariables.css";
import "./rootVariables/sizingVariables.css";
import "./rootVariables/timingVariables.css";

export function ThemingProvider({ children }: Readonly<PropsWithChildren>) {
	return children;
}
