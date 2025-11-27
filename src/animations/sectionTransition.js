export function sectionTransition() {
	const section = document.querySelector(
		"[data-animation='section-transition']"
	);

	if (!section) return;

	const wrapper = section.parentNode;

	gsap.context((self) => {
		const trigger = self.selector("[data-trigger]");
		const blocks = self.selector(".transition_bg_block");

		const mm = gsap.matchMedia();

		gsap.set(trigger, {
			height: "150vh",
		});

		mm.add(
			{
				desktop: "(min-width: 992px)",
				tablet: "(min-width: 768px) and (max-width: 991px)",
				mobile: "(max-width: 767px)",
			},
			(context) => {
				const { desktop, tablet, mobile } = context.conditions;

				const desktopTl = gsap.timeline({
					scrollTrigger: {
						trigger,
						start: "top bottom",
						endTrigger: wrapper,
						end: "bottom bottom",
						scrub: true,
					},
					defaults: {
						ease: "power3.out",
						// duration: 2,
					},
				});

				desktopTl.to(blocks, {
					height: "100vh",
					stagger: {
						each: 0.2,
						from: "end",
					},
				});

				return () => {
					desktopTl.kill();
				};
			}
		);
	}, wrapper);
}
