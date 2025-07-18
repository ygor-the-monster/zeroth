export type Toast = {
	id: string;
	message: string;
	duration?: number;
	icon?: React.ReactNode;
	action?: () => void;
};

export type ToastContextType = {
	addToast: (toast: Omit<Toast, "id">) => () => void;
};
