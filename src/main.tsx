import { createRoot } from "react-dom/client";
import { Providers } from "./providers";
import { Routes } from "./routes";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);
createRoot(root).render(
	<Providers>
		<Routes />
	</Providers>,
);
