import { clamp, lerp } from "@utils/interpolationMethods";
import { useEffect, useRef, useState } from "react";
import {
	PARALLAX_BANNER_ANIMATION_SPEED,
	PARALLAX_BANNER_OUTER_BOUNDS_X,
	PARALLAX_BANNER_OUTER_BOUNDS_Y,
	PARALLAX_BANNER_IDLE_AMPLITUDE_X,
	PARALLAX_BANNER_IDLE_AMPLITUDE_Y,
	PARALLAX_BANNER_IDLE_FREQUENCY_X,
	PARALLAX_BANNER_IDLE_FREQUENCY_Y,
} from "./ParallaxBanner.consts";
import styles from "./ParallaxBanner.module.css";
import type {
	ParallaxBannerLayer,
	ParallaxBannerProps,
} from "./ParallaxBanner.types";

export function ParallaxBanner({ background, layers }: ParallaxBannerProps) {
	const [cameraPositionX, setCameraPositionX] = useState(0);
	const [cameraPositionY, setCameraPositionY] = useState(0);
	const targetCameraPositionX = useRef(0);
	const targetCameraPositionY = useRef(0);

	const [isMouseOver, setIsMouseOver] = useState(false);

	const bannerRef = useRef<HTMLElement>(null);
	const [bannerRect, setBannerRect] = useState<DOMRect | null>(null);
	useEffect(() => {
		const banner = bannerRef.current;
		if (!banner) return;
		setBannerRect(banner.getBoundingClientRect());

		const handleResize = () => {
			if (!banner) return;
			setBannerRect(banner.getBoundingClientRect());
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const idleAnimationFrameRef = useRef<number | null>(null);
	const idleStartTimeRef = useRef<number>(0);

	const animationFrameRef = useRef<number | null>(null);
	const animationTimeRef = useRef<number>(0);
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (!isMouseOver || !bannerRect) return;
			const x = event.clientX - bannerRect.left;
			const y = event.clientY - bannerRect.top;

			const clampedX = clamp((x / bannerRect.width) * 100, 0, 100);
			const clampedY = clamp((y / bannerRect.height) * 100, 0, 100);

			targetCameraPositionX.current = clampedX;
			targetCameraPositionY.current = clampedY;
		};
		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [isMouseOver, bannerRect]);
	useEffect(() => {
		const animate = (time: number) => {
			if (isMouseOver) return;

			if (!idleStartTimeRef.current) idleStartTimeRef.current = time;
			const delta = (time - idleStartTimeRef.current) / 1000;

			targetCameraPositionX.current =
				50 +
				Math.sin(delta * PARALLAX_BANNER_IDLE_FREQUENCY_X) *
					PARALLAX_BANNER_IDLE_AMPLITUDE_X;
			targetCameraPositionY.current =
				50 +
				Math.cos(delta * PARALLAX_BANNER_IDLE_FREQUENCY_Y) *
					PARALLAX_BANNER_IDLE_AMPLITUDE_Y;

			idleAnimationFrameRef.current = requestAnimationFrame(animate);
		};
		idleAnimationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (idleAnimationFrameRef.current)
				cancelAnimationFrame(idleAnimationFrameRef.current);

			idleAnimationFrameRef.current = null;
			idleStartTimeRef.current = 0;
		};
	}, [isMouseOver]);

	useEffect(() => {
		const animate = (time: number) => {
			if (!animationTimeRef.current) animationTimeRef.current = time;

			const deltaTime = time - animationTimeRef.current;
			const lerpSpeed = Math.min((deltaTime / 1000) * PARALLAX_BANNER_ANIMATION_SPEED, 1);

			const lerpX = lerp(
				cameraPositionX,
				targetCameraPositionX.current,
				lerpSpeed,
			);
			const lerpY = lerp(
				cameraPositionY,
				targetCameraPositionY.current,
				lerpSpeed,
			);

			const clampedX = clamp(lerpX, 0 - PARALLAX_BANNER_OUTER_BOUNDS_X, 100 + PARALLAX_BANNER_OUTER_BOUNDS_X);
			const clampedY = clamp(lerpY, 0 - PARALLAX_BANNER_OUTER_BOUNDS_Y, 100 + PARALLAX_BANNER_OUTER_BOUNDS_Y);

			setCameraPositionX(clampedX);
			setCameraPositionY(clampedY);

			animationTimeRef.current = time;
			animationFrameRef.current = requestAnimationFrame(animate);
		};
		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameRef.current)
				cancelAnimationFrame(animationFrameRef.current);

			animationFrameRef.current = null;
			animationTimeRef.current = 0;
		};
	}, [cameraPositionX, cameraPositionY]);

	const getLayerPosition = (layer: ParallaxBannerLayer) => {
		const x = layer.position.x + (cameraPositionX - 50) / layer.depth;
		const y = layer.position.y + (cameraPositionY - 50) / layer.depth;
		return { x, y };
	};

	const getLayerTranslation = (anchor: { x: string; y: string }) => {
		let anchorX = 0;
		let anchorY = 0;
		switch (anchor.x) {
			case "center":
				anchorX = -50;
				break;
			case "right":
				anchorX = -100;
				break;
			case "left":
				anchorX = 0;
				break;
		}
		switch (anchor.y) {
			case "center":
				anchorY = -50;
				break;
			case "bottom":
				anchorY = -100;
				break;
			case "top":
				anchorY = 0;
				break;
		}
		return { x: anchorX, y: anchorY };
	};

	return (
		<header
			className={styles.banner}
			onMouseEnter={() => setIsMouseOver(true)}
			onMouseLeave={() => setIsMouseOver(false)}
			ref={bannerRef}
		>
			<img
				alt={`Parallax Banner - ${background.alt}`}
				className={styles.background}
				src={background.src}
			/>
			{layers
				.sort((a, b) => b.depth - a.depth)
				.map((layer) => (
					<img
						alt={`Parallax Banner - ${layer.image.alt}`}
						className={styles.layer}
						key={layer.key}
						src={layer.image.src}
						style={{
							height: `${layer.size.height}%`,
							left: `${getLayerPosition(layer).x}%`,
							top: `${getLayerPosition(layer).y}%`,
							width: `${layer.size.width}%`,
							transform: `translate(${getLayerTranslation(layer.anchor).x}%, ${getLayerTranslation(layer.anchor).y}%) translateZ(${layer.depth}px)`
						}}
					/>
				))}
		</header>
	);
}
