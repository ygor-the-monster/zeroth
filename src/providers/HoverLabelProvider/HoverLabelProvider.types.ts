export type HoverLabel = {
	id: string;
	label: string;
	elementRef: { current: HTMLElement };
};

export type HoverLabelElement = HTMLElement & { __hoverLabelId?: string };
