gsap.registerPlugin(ScrollTrigger);

export function initLinesReveal(splitTextLines) {
	const lineReveals = gsap.utils.toArray("[data-lines-reveal='true']");

	if (!splitTextLines || !lineReveals.length) return;

	lineReveals.forEach((line) => {
		if (!line) return;
		if (line.getAttribute("data-lines-reveal") !== "true") return;

		const rects = gsap.utils.toArray(".line-rectangle", line);
		const masks = gsap.utils.toArray(".line-mask", line);

		if (!rects || !masks) return;

		gsap.set(masks, { clipPath: "inset(0 100% 0 0)" });
		gsap.timeline({
			scrollTrigger: {
				trigger: line,
				start: "top bottom",
				end: "top center",
				toggleActions: "play none none none",
				immediateRender: true,
			},
			defaults: {
				ease: "power2.inOut",
				duration: 1.25,
			},
		})
			.fromTo(
				masks,
				{ clipPath: "inset(0 100% 0 0)" },
				{ clipPath: "inset(0 0% 0 0)" },
				"<"
			)
			.fromTo(
				rects,
				{ scaleX: 1, transformOrigin: "right center" },
				{ scaleX: 0, stagger: 0.15 },
				0.25
			);
	});
}

// export function initLinesReveal(splitTextLines) {
// 	const lineRectangles = gsap.utils.toArray(".line-rectangle");

// 	if (!splitTextLines) return;

// 	splitTextLines.lines.forEach((line, i) => {
// 		if (!line) return;

// 		const originalTarget = line.closest('[data-split="lines"]');
// 		if (!originalTarget) return;

// 		if (originalTarget.getAttribute("data-lines-reveal") !== "true") return;

// 		const rect = lineRectangles[i];
// 		const mask = splitTextLines.masks[i];

// 		if (!rect || !mask) return;

// 		gsap.set(mask, { clipPath: "inset(0 100% 0 0)" });
// 		gsap.timeline({
// 			scrollTrigger: {
// 				trigger: originalTarget,
// 				start: "top bottom",
// 				end: "top center",
// 				toggleActions: "play none none none",
// 				immediateRender: true,
// 			},
// 			defaults: {
// 				ease: "power2.inOut",
// 			},
// 		})
// 			.fromTo(
// 				mask,
// 				{ clipPath: "inset(0 100% 0 0)" },
// 				{ clipPath: "inset(0 0% 0 0)", stagger: 0.2 },
// 				"<"
// 			)
// 			.fromTo(
// 				rect,
// 				{ scaleX: 1, transformOrigin: "right center" },
// 				{ scaleX: 0 },
// 				"<25%"
// 			);
// 	});
// }
