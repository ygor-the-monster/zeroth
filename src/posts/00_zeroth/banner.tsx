import backgroundImage from "@assets/00_zerothBanner/background.png?url";
import robotImage from "@assets/00_zerothBanner/robot.png?url";
import screenLeftBottomImage from "@assets/00_zerothBanner/screen_left_bottom.png?url";
import screenLeftTopImage from "@assets/00_zerothBanner/screen_left_top.png?url";
import screenRightBottomImage from "@assets/00_zerothBanner/screen_right_bottom.png?url";
import screenRightTopImage from "@assets/00_zerothBanner/screen_right_top.png?url";
import { ParallaxBanner } from "@components/ParallaxBanner";
import type {
	ParallaxBannerLayer,
	ParallaxBannerLayerImage,
} from "@components/ParallaxBanner/ParallaxBanner.types";

export function Banner() {
	const background: ParallaxBannerLayerImage = {
		alt: "Background",
		src: backgroundImage,
	};
	const layers: ParallaxBannerLayer[] = [
		{
			depth: 150,
			image: { alt: "Robot", src: robotImage },
			key: "robot",
			position: { x: 50, y: 110 },
			size: { height: 112, width: 94 },
			anchor: { x: "center", y: "bottom" },
		},
		{
			depth: 250,
			image: { alt: "Screen Left Bottom", src: screenLeftBottomImage },
			key: "screen-left-bottom",
			position: { x: 20, y: 110 },
			size: { height: 55, width: 10 },
			anchor: { x: "left", y: "bottom" },
		},
		{
			depth: 300,
			image: { alt: "Screen Left Top", src: screenLeftTopImage },
			key: "screen-left-top",
			position: { x: 0, y: 0 },
			size: { height: 40, width: 60 },
			anchor: { x: "left", y: "top" },
		},
		{
			depth: 200,
			image: { alt: "Screen Right Bottom", src: screenRightBottomImage },
			key: "screen-right-bottom",
			position: { x: 100, y: 95 },
			size: { height: 60, width: 30 },
			anchor: { x: "right", y: "bottom" },
		},
		{
			depth: 170,
			image: { alt: "Screen Right Top", src: screenRightTopImage },
			key: "screen-right-top",
			position: { x: 70, y: 50  },
			size: { height: 40, width: 40 },
			anchor: { x: "center", y: "bottom" },
		},
	];

	return <ParallaxBanner background={background} layers={layers} />;
}
