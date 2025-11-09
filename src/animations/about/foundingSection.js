import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function foundingSectionAnimation() {
	const section = document.querySelector(".horizontal_wrap");

	if (!section) return;

	gsap.context((self) => {
		let velocity = 0;
		let direction = 1;
		let isFirstUpdate = true;
		const titles = self.selector(".founding_title");
		const animateSkewX = gsap.quickTo(titles, "skewX", {
			duration: 0.4,
			ease: "power3.out",
		});

		let skewValue = 0;

		animateSkewX(skewValue);

		const mm = gsap.matchMedia();

		mm.add("(min-width: 992px)", () => {
			ScrollTrigger.create({
				trigger: section,
				start: "top top",
				end: "bottom bottom",
				scrub: true,
				onUpdate: (self) => {
					if (isFirstUpdate) {
						isFirstUpdate = false;
						return;
					}

					velocity = self.getVelocity() / 100;
					direction = self.direction;

					skewValue = gsap.utils.mapRange(
						0,
						20,
						0,
						15,
						Math.abs(velocity)
					);
					animateSkewX(skewValue * -direction);
				},
				onLeave: () => {
					skewValue = 0;
					animateSkewX(skewValue);
				},
				onLeaveBack: () => {
					skewValue = 0;
					animateSkewX(skewValue);
				},
			});

			return () => {
				gsap.killTweensOf(titles);
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			};
		});
	}, section);
}
