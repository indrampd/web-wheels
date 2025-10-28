import { gsap } from "gsap";

export function foundingSectionAnimation(lenis) {
	const section = document.querySelector(".horizontal_wrap");

	if (!section) return;

	gsap.context(() => {
		let velocity = 0;
		lenis.on("scroll", (e) => {
			velocity = e.velocity;
		});

		// create quickSetter scale for .g_visual_wrap
		const gVisualWrap = section.querySelectorAll(".u-visual-wrap");
		// const setScaleX = gsap.quickSetter(gVisualWrap, "scaleX");
		const setScaleY = gsap.quickSetter(gVisualWrap, "scaleY");

		let scaleValue = 1;

		gsap.ticker.add(() => {
			scaleValue = gsap.utils.mapRange(0, 20, 1, 0.8, Math.abs(velocity));
			// setScaleX(scaleValue);
			setScaleY(scaleValue);
		});

		gsap.ticker.lagSmoothing(0);
	}, section);
}
