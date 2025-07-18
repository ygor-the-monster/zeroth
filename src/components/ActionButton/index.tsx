import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./ActionButton.module.css";
import type {
	ActionButtonProps,
	ActionGroupButtonProps,
} from "./ActionButton.types";

export function ActionGroupButton({
	display,
	actions,
	data,
	className,
}: ActionGroupButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(document.createElement("div"));
	useOnClickOutside(ref, () => setIsOpen(false));

	return (
		<div className={styles.container} ref={ref}>
			<button
				aria-label={display.label}
				className={`${styles.button} ${className ?? ""}`}
				onClick={() => setIsOpen(!isOpen)}
				{...(data &&
					Object.entries(data).map(([key, value]) => ({
						[`data-${key}`]: value,
					})))}
				type="button"
			>
				{display.icon}
			</button>
			<div
				className={styles.dropdown}
				data-open={isOpen}
				style={{ "--actions-length": actions.length }}
			>
				{actions.map((action) => (
					<button
						aria-label={action.display.label}
						className={`${styles.button} ${action.className ?? ""}`}
						key={action.key}
						onClick={action.action}
						{...(action.data &&
							Object.entries(action.data).map(([key, value]) => ({
								[`data-${key}`]: value,
							})))}
						type="button"
					>
						{action.display.icon}
					</button>
				))}
			</div>
		</div>
	);
}

export function ActionButton({
	display,
	action,
	data,
	className,
}: ActionButtonProps) {
	return (
		<button
			aria-label={display.label}
			className={`${styles.button} ${className ?? ""}`}
			onClick={action}
			{...(data &&
				Object.entries(data).map(([key, value]) => ({
					[`data-${key}`]: value,
				})))}
			type="button"
		>
			{display.icon}
		</button>
	);
}
