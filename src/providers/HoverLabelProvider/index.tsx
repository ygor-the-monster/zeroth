import type { PropsWithChildren, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HoverLabelProvider.module.css";
import type { HoverLabel, HoverLabelElement } from "./HoverLabelProvider.types";

export function HoverLabelProvider({ children }: Readonly<PropsWithChildren>) {
	const [hoverLabels, setHoverLabels] = useState<HoverLabel[]>([]);
	const mousePositionRef = useRef({ x: 0, y: 0 });
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onMouseMove = useCallback((e: MouseEvent) => {
		mousePositionRef.current = { x: e.clientX, y: e.clientY };
	}, []);

	useEffect(() => {
		const handleMouseEnter = (e: MouseEvent) => {
			const target = e.currentTarget as HTMLElement;
			const label = target.getAttribute("data-hover-label");
			if (label) {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}

				timeoutRef.current = setTimeout(() => {
					const id = crypto.randomUUID();
					const elementRef: RefObject<HoverLabelElement> = {
						current: target as HoverLabelElement,
					};
					setHoverLabels((prev) => [
						...prev,
						{
							elementRef,
							id,
							label,
						},
					]);
					(target as HoverLabelElement).__hoverLabelId = id;
				}, 500);
			}
		};

		const handleMouseLeave = (e: MouseEvent) => {
			const target = e.currentTarget as HTMLElement;

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}

			const id = (target as HoverLabelElement).__hoverLabelId;
			if (id) {
				setHoverLabels((prev) => prev.filter((hl) => hl.id !== id));
				delete (target as HoverLabelElement).__hoverLabelId;
			}
		};

		const selector = "[data-hover-label]";

		const addListeners = (el: Element) => {
			el.addEventListener("mouseenter", handleMouseEnter as EventListener);
			el.addEventListener("mouseleave", handleMouseLeave as EventListener);
		};

		const removeListeners = (el: Element) => {
			el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
			el.removeEventListener("mouseleave", handleMouseLeave as EventListener);
		};

		const elements = Array.from(document.querySelectorAll(selector));
		elements.forEach(addListeners);

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (!(node instanceof Element)) return;
					if (node.matches(selector)) {
						addListeners(node);
					}
					const descendants = node.querySelectorAll?.(selector);
					if (descendants && descendants.length > 0) {
						descendants.forEach(addListeners);
					}
				});
				mutation.removedNodes.forEach((node) => {
					if (!(node instanceof Element)) return;
					if (node.matches(selector)) {
						removeListeners(node);
					}
					node.querySelectorAll?.(selector).forEach(removeListeners);
				});
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			elements.forEach(removeListeners);
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("scroll", () => {
			setHoverLabels((prev) => [...prev]);
		});
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, [onMouseMove]);

	return (
		<>
			{children}
			<div className={styles.hoverLabelContainer}>
				{hoverLabels.map((hoverLabel) => {
					const element = hoverLabel.elementRef?.current;
					if (!element) return null;

					const rect = element.getBoundingClientRect();
					return (
						<div
							className={styles.hoverLabel}
							key={hoverLabel.id}
							style={{
								left: rect.left + rect.width / 2,
								top: rect.top - 8,
							}}
						>
							{hoverLabel.label}
						</div>
					);
				})}
			</div>
		</>
	);
}
