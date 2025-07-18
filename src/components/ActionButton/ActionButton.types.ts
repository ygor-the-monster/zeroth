export type ActionIcon = {
	label: string;
	icon: React.ReactNode;
};

export type ActionGroupButtonProps = {
	display: ActionIcon;
	actions: (ActionButtonProps & { key: string })[];
	data?: Record<string, string>;
	className?: string;
};

export type ActionButtonProps = {
	display: ActionIcon;
	action: () => void;
	data?: Record<string, string>;
	className?: string;
};
