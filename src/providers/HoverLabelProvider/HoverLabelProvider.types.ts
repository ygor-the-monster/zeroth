export type HoverLabel = {
	id: string;
	label: string;
	elementRef: React.RefObject<HoverLabelElement>;
};

export type HoverLabelElement = HTMLElement & { __hoverLabelId?: string };
