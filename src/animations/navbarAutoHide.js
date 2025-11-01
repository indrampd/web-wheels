import { gsap } from "gsap";

export function initNavbarAutoHide() {
	const nav = document.querySelector(".nav_component");
	if (!nav) return;

	let lastScrollTop = 0;
	const threshold = 10; // Minimum scroll distance to trigger hide/show

	window.addEventListener(
		"scroll",
		() => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			if (scrollTop > lastScrollTop + threshold) {
				gsap.to(nav, {
					yPercent: -100,
					duration: 0.4,
					ease: "power2.out",
				});
			} else if (scrollTop < lastScrollTop - threshold) {
				gsap.to(nav, {
					yPercent: 0,
					duration: 0.4,
					ease: "power2.out",
				});
			}
			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		},
		false
	);
}
