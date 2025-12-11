function exploreAnimation() {
	const section = document.querySelector(".explore_wrap");
	if (!section) return;

	const infoDetails = section.querySelectorAll(".explore_info_wrap");
	const paths = section.querySelectorAll(".explore_info_wrap path");
	const dots = section.querySelectorAll(".explore_info_wrap circle");
	const labels = section.querySelectorAll(
		".explore_info_wrap .explore_info_label"
	);

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "clamp(top top)",
			end: "clamp(bottom top)",
		},
	});

	tl.to(
		paths,
		{
			drawSVG: "0% 100%",
			stagger: 0.2,
			ease: "none",
		},
		0
	);

	tl.from(
		dots,
		{
			autoAlpha: 0,
			stagger: 0.2,
			ease: "bounce.in",
		},
		0
	);

	tl.from(
		labels,
		{
			autoAlpha: 0,
			stagger: 0.2,
			ease: "none",
		},
		0
	);
}

export { exploreAnimation };
