gsap.registerPlugin(ScrollTrigger);

export function parallaxAnimation(intensity = 0.3) {
	const parallaxElements = gsap.utils.toArray(
		"[data-parallax-animation='true']"
	);

	if (!parallaxElements.length) return;

	parallaxElements.forEach((element) => {
		const img = element.querySelector("img");
		if (!img) return;

		gsap.set(img, { willChange: "transform" });

		gsap.to(img, {
			yPercent: `+=${intensity * 100}`,
			ease: "none",
			scrollTrigger: {
				trigger: element,
				start: "clamp(top bottom)",
				end: "clamp(bottom top)",
				invalidateOnRefresh: true,
				scrub: true,
			},
		});
	});
}
