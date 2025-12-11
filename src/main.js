import Lenis from "lenis";
import { preloadImages } from "./utils/preloadImages";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { initTextSplit } from "./utils/textSplit";
import { initLinesReveal } from "./animations/linesReveal";
import { initHorizontalScroll } from "./animations/horizontalScroll";
import { initNavbarAutoHide } from "./animations/navbarAutoHide";
import { foundingSectionAnimation } from "./animations/about/foundingSection";
import "./style.css";
import { sectionTransition } from "./animations/sectionTransition";
import { parallaxAnimation } from "./animations/parallaxAnimation";
import { aftermarketSlider } from "./animations/about/aftermarketSlider";
import { exploreAnimation } from "./animations/home/exploreAnimation";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("cEase", "0.65, 0.05, 0, 1");
CustomEase.create("cEaseReverse", "1, 0, 0.35, 0.95");
CustomEase.create("cEase2", "0.45,0.2,0.1,1");

gsap.defaults({
	ease: "cEase",
	duration: 1,
});

let lenis = new Lenis({
	lerp: 0.125,
	wheelMultiplier: 0.8,
	gestureOrientation: "vertical",
	normalizeWheel: false,
	smoothTouch: false,
	autoResize: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.querySelectorAll("[data-lenis-start]").forEach((element) => {
	element.addEventListener("click", () => {
		lenis.start();
	});
});

document.querySelectorAll("[data-lenis-stop]").forEach((element) => {
	element.addEventListener("click", () => {
		lenis.stop();
	});
});

document.querySelectorAll("[data-lenis-toggle]").forEach((element) => {
	element.addEventListener("click", function () {
		this.classList.toggle("stop-scroll");
		if (this.classList.contains("stop-scroll")) {
			lenis.stop();
		} else {
			lenis.start();
		}
	});
});

let splitTextLines, splitTextWords, splitTextChars;

document.fonts.ready.then(() => {
	({ splitTextLines, splitTextWords, splitTextChars } = initTextSplit(
		splitTextLines,
		splitTextWords,
		splitTextChars
	));

	initLinesReveal(splitTextLines);

	window.addEventListener("resize", () => {
		gsap.delayedCall(0.5, () => {
			({ splitTextLines, splitTextWords, splitTextChars } = initTextSplit(
				splitTextLines,
				splitTextWords,
				splitTextChars
			));
			initLinesReveal(splitTextLines);
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	if (typeof window.gsap === "undefined") {
		document.documentElement.classList.add("gsap-not-found");
	}
	gsap.set('[data-prevent-flicker="true"], [data-split]', { autoAlpha: 1 });

	initHorizontalScroll();
	initNavbarAutoHide();
	foundingSectionAnimation();
	sectionTransition();

	// Home
	exploreAnimation();

	// about
	aftermarketSlider();

	preloadImages().then(() => {
		console.log("All images preloaded. Starting animations...");
	});
});
