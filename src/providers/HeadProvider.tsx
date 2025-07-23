import faviconLinks from "virtual:favicons";
import { useMetaConfig } from "@hooks/useConfig";
import { getLocale } from "@i18n/runtime";
import { type PropsWithChildren, useEffect, useMemo } from "react";

export function HeadProvider({ children }: Readonly<PropsWithChildren>) {
	const { HEAD_DESCRIPTION, HEAD_TITLE } = useMetaConfig();

	const { head } = useMemo(
		() => new DOMParser().parseFromString(faviconLinks, "text/html"),
		[],
	);

	useEffect(() => {
		for (const node of head.children) {
			let selector = "";
			switch (node.tagName) {
				case "META":
					selector = `meta[name="${node.getAttribute("name")}"]`;
					break;
				case "LINK":
					selector = `link[rel="${node.getAttribute("rel")}"]`;
					break;
			}

			if (!document.head.querySelector(selector))
				document.head.appendChild(node);
		}

		document.title = HEAD_TITLE;

		const metaDescription = document.querySelector("meta[name='description']");
		if (metaDescription) {
			metaDescription.setAttribute("content", HEAD_DESCRIPTION);
		} else {
			const meta = document.createElement("meta");
			meta.setAttribute("name", "description");
			meta.setAttribute("content", HEAD_DESCRIPTION);
			document.head.appendChild(meta);
		}

		document.documentElement.lang = getLocale();
	}, [head, HEAD_DESCRIPTION, HEAD_TITLE]);

	return children;
}
