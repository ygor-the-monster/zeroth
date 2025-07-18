import type { PropsWithChildren } from "react";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ToastProvider.module.css";
import type { Toast, ToastContextType } from "./ToastProvider.types";

export const ToastContext = createContext<ToastContextType>({
	addToast: () => () => {},
});

export function ToastProvider({ children }: Readonly<PropsWithChildren>) {
	const [toastQueue, setToastQueue] = useState<
		(Toast & { startTime: number })[]
	>([]);
	const [fadingOutIds, setFadingOutIds] = useState<string[]>([]);
	const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

	const contextValue = useMemo(
		() => ({
			addToast: (toast: Omit<Toast, "id">): (() => void) => {
				const id = crypto.randomUUID();
				const now = Date.now();
				const removeToast = () => {
					setFadingOutIds((prev) => [...prev, id]);
				};

				setToastQueue((prev) => {
					const nonFading = prev.filter((t) => !fadingOutIds.includes(t.id));
					let toFade: string[] = [];
					if (nonFading.length >= 3) {
						const now = Date.now();
						const sorted = nonFading
							.map((t) => ({
								...t,
								remaining: (t.duration ?? 3000) - (now - t.startTime),
							}))
							.sort((a, b) => a.remaining - b.remaining);
						toFade = sorted.slice(0, nonFading.length - 2).map((t) => t.id);
						setFadingOutIds((fading) => [
							...fading,
							...toFade.filter((id) => !fading.includes(id)),
						]);
					}
					return [
						...prev,
						{
							action: removeToast,
							duration: 3000,
							id,
							startTime: now,
							...toast,
						},
					];
				});
				return removeToast;
			},
		}),
		[fadingOutIds],
	);

	useEffect(() => {
		if (toastQueue.length === 0) return;

		const toast = toastQueue[0];
		if (fadingOutIds.includes(toast.id)) return;

		const now = Date.now();
		const elapsed = now - toast.startTime;
		const remaining = (toast.duration ?? 3000) - elapsed;
		const timeout = setTimeout(
			() => {
				setFadingOutIds((prev) => [...prev, toast.id]);
			},
			Math.max(remaining, 0),
		);
		timeoutsRef.current[toast.id] = timeout;

		return () => clearTimeout(timeout);
	}, [toastQueue, fadingOutIds]);

	const handleAnimationEnd = (id: string) => {
		setToastQueue((prev) => prev.filter((t) => t.id !== id));
		setFadingOutIds((prev) => prev.filter((fid) => fid !== id));
		if (timeoutsRef.current[id]) {
			clearTimeout(timeoutsRef.current[id]);
			delete timeoutsRef.current[id];
		}
	};

	return (
		<ToastContext.Provider value={contextValue}>
			{children}
			<div className={styles.toastContainer}>
				{toastQueue.map((toast) => (
					<div
						className={
							styles.toast +
							(fadingOutIds.includes(toast.id) ? ` ${styles.fadeOut}` : "")
						}
						key={toast.id}
						onAnimationEnd={() =>
							fadingOutIds.includes(toast.id) && handleAnimationEnd(toast.id)
						}
						onClick={() => {
							if (!fadingOutIds.includes(toast.id)) {
								toast.action?.();
							}
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !fadingOutIds.includes(toast.id)) {
								toast.action?.();
							}
						}}
						style={{ "--toast-duration": `${toast.duration}ms` }}
					>
						{toast.icon}
						<span>{toast.message}</span>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}
