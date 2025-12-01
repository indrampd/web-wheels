function aftermarketSlider() {
	const comp = document.querySelector(".aftermarket_slider_component");
	const swiperEl = comp?.querySelector(".swiper.is-aftermarket");
	const prevEl = comp?.querySelector("#prev-btn");
	const nextEl = comp?.querySelector("#next-btn");

	if (!comp) return;

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
	});
}

export { aftermarketSlider };
