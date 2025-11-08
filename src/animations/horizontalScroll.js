import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHorizontalScroll() {
	const section = document.querySelector(".horizontal_wrap");

	if (!section) return;

	gsap.context(() => {
		const spacer = document.querySelector(
			".horizontal_wrap [data-trigger]"
		);
		const sections = gsap.utils.toArray(".horizontal_track section");

		const mm = gsap.matchMedia();

		mm.add("(min-width: 992px)", () => {
			function updateHeight() {
				gsap.set(spacer, {
					height: () => window.innerWidth * sections.length,
				});
				ScrollTrigger.refresh();
			}

			updateHeight();

			let scrollTween = gsap
				.timeline({
					scrollTrigger: {
						trigger: spacer,
						start: "top bottom",
						end: "bottom bottom",
						// markers: true,
						scrub: true,
					},
				})
				.to(sections, {
					xPercent: -100 * (sections.length - 1),
					ease: "none",
				});

			sections.forEach((section) => {
				const targetLines = gsap.utils.toArray(
					"[data-split='lines']:not([data-lines-reveal='true'])"
				);

				if (!targetLines.length) return;

				targetLines.forEach((line) => {
					const lines = gsap.utils.toArray(".line", line);
					gsap.timeline({
						scrollTrigger: {
							trigger: line,
							containerAnimation: scrollTween,
							start: "left right-=15%",
						},
						onComplete: () => {
							gsap.set(lines, { clearProps: "transform" });
						},
					}).fromTo(
						lines,
						{ yPercent: 100 },
						{
							yPercent: 0,
							stagger: 0.025,
						}
					);
				});
			});

			window.addEventListener("resize", updateHeight);

			return () => {
				window.removeEventListener("resize", updateHeight);
				// scrollTween.scrollTrigger.kill();
				scrollTween.kill();
			};
		});
	}, section);
}
