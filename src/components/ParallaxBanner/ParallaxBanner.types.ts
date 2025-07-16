export type ParallaxBannerLayerImage = {
	src: string;
	alt: string;
};

export type ParallaxBannerLayer = {
	key: string;
	image: ParallaxBannerLayerImage;
	depth: number;
	size: {
		width: number;
		height: number;
	};
	position: {
		x: number;
		y: number;
	};
	anchor: {
		x: "left" | "center" | "right";
		y: "top" | "center" | "bottom";
	};
};

export type ParallaxBannerProps = {
	background: ParallaxBannerLayerImage;
	layers: ParallaxBannerLayer[];
};
