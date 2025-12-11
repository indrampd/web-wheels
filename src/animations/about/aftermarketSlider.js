function aftermarketSlider() {
	const comp = document.querySelector(".aftermarket_slider_component");

	if (!comp) return;

	const swiperEl = comp.querySelector(".swiper.is-aftermarket");
	const prevEl = comp.querySelector("#prev-btn");
	const nextEl = comp.querySelector("#next-btn");

	const titles = document.querySelectorAll(
		".aftermarket_wrap .aftermarket_title"
	);

	const swiper = new Swiper(swiperEl, {
		slidesPerView: 1,
		speed: 800,
		grabCursor: true,
		navigation: {
			prevEl: prevEl,
			nextEl: nextEl,
		},
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		keyboard: { enabled: true, pageUpDown: false },
		mousewheel: { enabled: true, forceToAxis: true, thresholdDelta: 25 },
		on: {
			slideChange: (swiper) => {
				titles.forEach((title, index) => {
					if (index === swiper.realIndex) {
						title.classList.add("is-active");
					} else {
						title.classList.remove("is-active");
					}
				});
			},
		},
	});
}

export { aftermarketSlider };
