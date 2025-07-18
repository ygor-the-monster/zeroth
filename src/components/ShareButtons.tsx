import { ActionGroupButton } from "@components/ActionButton";
import type { ActionGroupButtonProps } from "@components/ActionButton/ActionButton.types";
import { m } from "@i18n/messages";
import { SiWhatsapp, SiX } from "@icons-pack/react-simple-icons";
import { ToastContext } from "@providers/ToastProvider";
import { ClipboardCopy, ClipboardX, Link2, Share2 } from "lucide-react";
import { useCallback, useContext } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export function ShareButtons({
	className,
	data,
}: Pick<ActionGroupButtonProps, "className" | "data">) {
	const { addToast } = useContext(ToastContext);
	const [_copiedText, copy] = useCopyToClipboard();

	const shareX = useCallback(() => {
		window.open(
			`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
			"_blank",
		);
	}, []);

	const shareWhatsapp = useCallback(() => {
		window.open(
			`https://wa.me/?text=${encodeURIComponent(m.share_buttons_whatsapp_message({ url: window.location.href }))}`,
			"_blank",
		);
	}, []);

	const copyLink = useCallback(() => {
		copy(window.location.href)
			.then(() => {
				addToast({
					icon: <ClipboardCopy />,
					message: m.share_buttons_copy_toast_message(),
				});
			})
			.catch(() => {
				addToast({
					icon: <ClipboardX />,
					message: m.share_buttons_copy_toast_error_message(),
				});
			});
	}, [addToast, copy]);

	return (
		<ActionGroupButton
			actions={[
				{
					action: shareX,
					display: {
						icon: <SiX />,
						label: m.share_buttons_x_button_label(),
					},
					key: "x",
				},
				{
					action: shareWhatsapp,
					display: {
						icon: <SiWhatsapp />,
						label: m.share_buttons_whatsapp_button_label(),
					},
					key: "whatsapp",
				},
				{
					action: copyLink,
					display: {
						icon: <Link2 />,
						label: m.share_buttons_copy_button_label(),
					},
					key: "copy",
				},
			]}
			className={className}
			data={data}
			display={{
				icon: <Share2 />,
				label: m.share_buttons_button_label(),
			}}
		/>
	);
}
