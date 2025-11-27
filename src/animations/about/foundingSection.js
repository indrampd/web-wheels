gsap.registerPlugin(ScrollTrigger);

export function foundingSectionAnimation() {
	const section = document.querySelector(".horizontal_wrap");

	if (!section) return;

	gsap.context((self) => {
		let proxy = { skew: 0 };

		const titles = self.selector(".founding_title");
		const skewSetter = gsap.quickSetter(titles, "skewX", "deg");

		skewSetter(proxy.skew);

		const mm = gsap.matchMedia();

		mm.add("(min-width: 992px)", () => {
			ScrollTrigger.create({
				trigger: section,
				start: "top top",
				end: "bottom bottom",
				onUpdate: (self) => {
					let skewAmount = self.getVelocity() / -100;
					skewAmount = gsap.utils.clamp(-20, 20, skewAmount);
					if (Math.abs(skewAmount) > Math.abs(proxy.skew)) {
						proxy.skew = skewAmount;
						gsap.to(proxy, {
							skew: 0,
							duration: 0.8,
							ease: "power3",
							overwrite: true,
							onUpdate: () => skewSetter(proxy.skew),
						});
					}
				},
			});

			return () => {
				gsap.killTweensOf(titles);
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			};
		});
	}, section);
}
